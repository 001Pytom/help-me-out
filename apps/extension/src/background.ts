console.log("[BG] loaded");
let latestShareUrl: string | null = null;

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === "RECORDING_COMPLETE") {
    latestShareUrl = msg.url;
    sendResponse({ ok: true });
    return true;
  }

  if (msg?.type === "GET_LATEST_URL") {
    sendResponse({ url: latestShareUrl });
    return true;
  }

  return false;
});
