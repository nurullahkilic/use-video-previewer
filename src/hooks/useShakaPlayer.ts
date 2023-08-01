import { useRef, useEffect } from "react";
// @ts-ignore
import shaka from "https://cdn.jsdelivr.net/npm/shaka-player@4.3.8/+esm";
// @ts-ignore
import muxjs from "https://cdn.jsdelivr.net/npm/mux.js@6.3.0/+esm";

declare global {
  interface Window {
    player: any;
    muxjs: any;
  }
}

const useShakaPlayer = ({
  manifestUri = "https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd",
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error("Browser not supported!");
    }
  };

  // @ts-ignore
  const initPlayer = async () => {
    // Create a Player instance.
    const video = videoRef?.current;

    const player = new shaka.Player(video);
    player.configure("manifest.defaultPresentationDelay", 0);

    // Attach player to the window to make it easy to access in the JS console.
    window.player = player;
    window.muxjs = muxjs;

    // Listen for error events.
    player.addEventListener("error", onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      await player.load(manifestUri);

      // This runs if the asynchronous load is successful.
      console.log("The video has now been loaded!");
    } catch (e) {
      // onError is executed if the asynchronous load fails.
      onError(e);
    }
  };

  const onErrorEvent = (event: any) => {
    // Extract the shaka.util.Error object from the event.
    onError(event.detail);
  };

  const onError = (error: any) => {
    // Log the error.
    console.error("Error code", error.code, "object", error);
  };

  return [videoRef];
};

export default useShakaPlayer;
