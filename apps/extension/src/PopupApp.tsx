import React, { useReducer } from "react";
import { Button } from "@/components/ui/button";
import PermissionToggle from "@/components/toggle";

type RecordingState = "idle";
interface State {
  screenType: "Full screen" | "Current Tab";
  camera: boolean;
  mic: boolean;
}
const initialState: State = {
  screenType: "Full screen",
  camera: true,
  mic: true,
};

type Action =
  | { type: "SET_SCREEN_TYPE"; value: State["screenType"] }
  | { type: "TOGGLE_CAMERA" }
  | { type: "TOGGLE_MIC" };
function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "SET_SCREEN_TYPE":
      return { ...s, screenType: a.value };
    case "TOGGLE_CAMERA":
      return { ...s, camera: !s.camera };
    case "TOGGLE_MIC":
      return { ...s, mic: !s.mic };
    default:
      return s;
  }
}

export default function PopupApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const start = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab?.id) return;

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });

    chrome.tabs.sendMessage(tab.id, {
      type: "START_RECORDING",
      mic: state.mic,
      camera: state.camera,
      screenType: state.screenType,
    });

    window.close();
  };

  return (
    <div className="min-w-[280px] p-4 space-y-4 font-sans">
      <div className="flex justify-between items-center">
        <img src="/smallLogo.png" alt="logo" className="h-8" />
      </div>

      <div className="flex gap-2 justify-center">
        {(["Full screen", "Current Tab"] as const).map((t) => (
          <button
            key={t}
            onClick={() => dispatch({ type: "SET_SCREEN_TYPE", value: t })}
            className={`px-3 py-2 rounded-lg border ${state.screenType === t ? "border-blue-600 text-blue-600" : "border-gray-200"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <PermissionToggle
          icon="/video-camera.png"
          label="Camera"
          checked={state.camera}
          onChange={() => dispatch({ type: "TOGGLE_CAMERA" })}
        />
        <PermissionToggle
          icon="/microphone.png"
          label="Microphone"
          checked={state.mic}
          onChange={() => dispatch({ type: "TOGGLE_MIC" })}
        />
      </div>

      <Button onClick={start} className="w-full">
        Start recording
      </Button>
    </div>
  );
}
