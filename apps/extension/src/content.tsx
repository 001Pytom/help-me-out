import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { formatTime } from './utils/formatTime';

const ROOT_ID = 'ext-recorder-root-v1';

function getRoot() {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);
  }
  return root;
}

function RecorderUI({ initialMic, initialCamera, screenType }: { initialMic: boolean; initialCamera: boolean; screenType: 'Full screen' | 'Current Tab' }) {
  const [status, setStatus] = useState<'idle'|'recording'|'paused'|'stopped'>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [micOn, setMicOn] = useState(initialMic);
  const [cameraOn, setCameraOn] = useState(initialCamera);
  const [front, setFront] = useState(true);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const displayStreamRef = useRef<MediaStream|null>(null);
  const cameraStreamRef = useRef<MediaStream|null>(null);
  const mixedStreamRef = useRef<MediaStream|null>(null);
  const recorderRef = useRef<MediaRecorder|null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number|null>(null);

  useEffect(() => {
    const onStopEvent = () => stopRecording();
    document.addEventListener('ext-stop-recording', onStopEvent);
    return () => document.removeEventListener('ext-stop-recording', onStopEvent);
  }, []);

  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [status]);

  async function startRecording() {
    try {
      const displayStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: micOn });
      displayStreamRef.current = displayStream;

      if (cameraOn) {
        try {
          const cam = await navigator.mediaDevices.getUserMedia({ video: { facingMode: front ? 'user' : 'environment' }, audio: false });
          cameraStreamRef.current = cam;
        } catch (err) {
          console.warn('camera denied', err);
          cameraStreamRef.current = null;
          setCameraOn(false);
        }
      }

      const mixed = await createMixedStream(displayStreamRef.current, cameraOn ? cameraStreamRef.current : null, micOn);
      mixedStreamRef.current = mixed;

      const recorder = new MediaRecorder(mixed, { mimeType: 'video/webm;codecs=vp8,opus' });
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunksRef.current.push(e.data); };
      recorder.onstop = handleStop;
      recorder.start(1000);
      setStatus('recording');
    } catch (err) {
      console.error('startRecording failed', err);
      // fallback request to background
      chrome.runtime.sendMessage({ type: 'START_RECORDING_FALLBACK', includeAudio: micOn }, (resp) => console.log('fallback', resp));
    }
  }

  function pauseRecording() {
    recorderRef.current?.pause();
    setStatus('paused');
  }
  function resumeRecording() {
    recorderRef.current?.resume();
    setStatus('recording');
  }
  function stopRecording() {
    recorderRef.current?.stop();
  }

  function cleanupAll() {
    [displayStreamRef.current, cameraStreamRef.current, mixedStreamRef.current].forEach((s) => { s?.getTracks().forEach((t) => t.stop()); });
    displayStreamRef.current = cameraStreamRef.current = mixedStreamRef.current = null;
    recorderRef.current = null;
  }

  function handleStop() {
    const blob = new Blob(chunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setShareUrl(url);
    chrome.runtime.sendMessage({ type: 'RECORDING_COMPLETE', url });
    cleanupAll();
    setStatus('stopped');
    setElapsed(0);
  }

  async function createMixedStream(display?: MediaStream|null, camera?: MediaStream|null, includeMic = true): Promise<MediaStream> {
    const out = new MediaStream();
    const dispVideo = display?.getVideoTracks()?.[0];
    if (dispVideo) out.addTrack(dispVideo);

    // Create audio mixing
    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();

    function addTrackToCtx(stream?: MediaStream|null) {
      if (!stream) return;
      const tracks = stream.getAudioTracks();
      if (!tracks || tracks.length === 0) return;
      const src = audioCtx.createMediaStreamSource(new MediaStream([tracks[0]]));
      src.connect(dest);
    }

    if (includeMic) addTrackToCtx(display);
    // If display has no mic and user wants mic, try to get microphone separately
    if (includeMic && (!display || (display.getAudioTracks().length === 0))) {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        addTrackToCtx(micStream);
      } catch (err) {
        console.warn('mic access denied', err);
      }
    }

    // attach mixed audio
    dest.stream.getAudioTracks().forEach((t) => out.addTrack(t));
    return out;
  }

  return (
    <div className="fixed right-6 bottom-6 z-[999999] w-[360px] p-3 bg-white shadow-lg rounded-2xl text-sm">
      <div className="flex items-center gap-3">
        {/* rounded live camera preview */}
        <div className="w-14 h-14 rounded-full overflow-hidden bg-black flex-none">
          {cameraOn ? <CameraPreview streamRef={cameraStreamRef} /> : <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Cam</div>}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-medium">Recording</div>
            <div className="font-mono">{formatTime(elapsed)}</div>
          </div>

          <div className="mt-2 flex gap-2">
            {status === 'recording' ? (
              <button onClick={pauseRecording} className="px-3 py-1 rounded bg-yellow-50">Pause</button>
            ) : (
              <button onClick={resumeRecording} className="px-3 py-1 rounded bg-green-50">Resume</button>
            )}
            <button onClick={stopRecording} className="px-3 py-1 rounded bg-red-50">Stop</button>
            <button onClick={() => { setMicOn((s) => !s); /* toggling mic mid-record would require re-mixing streams; not covered here for simplicity */ }} className={`px-2 py-1 rounded ${micOn ? 'bg-blue-50' : 'bg-gray-100'}`}>Mic</button>
            <button onClick={() => { setCameraOn((s) => !s); }} className={`px-2 py-1 rounded ${cameraOn ? 'bg-blue-50' : 'bg-gray-100'}`}>Cam</button>
            <button onClick={() => { /* delete current blob if exists */ setShareUrl(null); }}>Delete</button>
          </div>
        </div>
      </div>

      {shareUrl && (
        <div className="mt-3 bg-gray-50 p-2 rounded">
          <div className="text-xs text-gray-600">Shareable link (temp)</div>
          <div className="mt-2 flex items-center gap-2">
            <input readOnly value={shareUrl} className="flex-1 text-xs p-1 bg-white rounded" />
            <button onClick={() => { navigator.clipboard.writeText(shareUrl); }} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}

function CameraPreview({ streamRef }: { streamRef: React.MutableRefObject<MediaStream|null> }) {
  const vRef = useRef<HTMLVideoElement|null>(null);
  useEffect(() => {
    const el = vRef.current;
    if (!el) return;
    el.autoplay = true; el.muted = true; el.playsInline = true;
    if (streamRef.current) el.srcObject = streamRef.current;
    const obs = new MutationObserver(() => {
      if (streamRef.current) el.srcObject = streamRef.current;
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [streamRef]);
  return <video ref={vRef} className="w-full h-full object-cover" />;
}

// Mount and message listener
(function mount() {
  const root = getRoot();
  const reactRoot = createRoot(root);
  reactRoot.render(<div />);

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type === 'START_RECORDING') {
      reactRoot.render(<RecorderUI initialMic={!!msg.mic} initialCamera={!!msg.camera} screenType={msg.screenType} />);
      // start the recording automatically by dispatching a small event the RecorderUI could pick up, or call a global method
      // For simplicity, the RecorderUI starts when mounted.
      sendResponse({ status: 'recording_started' });
      return true;
    }

    if (msg?.type === 'STOP_RECORDING') {
      // forward event to mounted component
      document.dispatchEvent(new CustomEvent('ext-stop-recording'));
      sendResponse({ status: 'stopping' });
      return true;
    }

    return false;
  });
})();