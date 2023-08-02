import React, { useState, useEffect } from "react";
import useShakaPlayer from "./useShakaPlayer";

interface IProps {
  isMuted: boolean;
  mediaUri: string;
  debounce: number;
}

const useVideoPreviewer: React.FC<IProps> = ({
  isMuted,
  mediaUri,
  debounce,
}) => {
  // console.log("useVideoPreviewer", mediaUri);
  const [videoElement, setVideoElement] = useState<React.ReactElement | any>(
    null
  );

  useEffect(() => {
    // console.log("Mounting useVideoPreviewer...");
    return () => {
      // console.log("Unmounting useVideoPreviewer...");
    };
  }, []);

  return [
    <>
      {mediaUri && (
        <PreviewerVideo
          setVideoElement={setVideoElement}
          isMuted={isMuted}
          mediaUri={mediaUri}
          debounce={debounce}
        />
      )}
    </>,
    videoElement,
  ];
};

export default useVideoPreviewer;

interface IPreviewerVideoProps {
  isMuted: boolean;
  mediaUri: string;
  setVideoElement: (element: React.ReactElement | any) => void;
  debounce: number;
}

const PreviewerVideo: React.FC<IPreviewerVideoProps> = ({
  mediaUri,
  isMuted,
  setVideoElement,
  debounce,
}) => {
  const [isShow, setIsShow] = useState(false);

  const [videoRef] = useShakaPlayer({
    manifestUri: mediaUri,
  });

  useEffect(() => {
    // console.log("Mounting PreviewerVideo...");
    const debounceTimeout = setTimeout(() => {
      setIsShow(true);
      // @ts-ignore
      videoRef?.current?.play();
    }, debounce);
    setVideoElement(videoRef?.current);

    return () => {
      // console.log("Unmounting PreviewerVideo...");
      setVideoElement(null);
      clearTimeout(debounceTimeout);
      setIsShow(false);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 20,
        }}
      >
        <video
          ref={videoRef}
          loop
          muted={isMuted}
          controls={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isShow ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      </div>
    </>
  );
};
