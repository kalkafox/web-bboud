import { useState, useContext, useRef, useEffect } from "react";

import { MainContext } from "./Contexts";

const Video = () => {
  const mainContext = useContext(MainContext);

  const videoRef = useRef();
  useEffect(() => {
    if (!mainContext.loaded) {
      const checkBufferInterval = setInterval(() => {
        let progressNum = 0;
        for (const i = 0; i < videoRef.current.buffered.length; i++) {
          console.log("ay2");
          progressNum = Math.floor(
            Math.round(
              (videoRef.current.buffered.end(i) / videoRef.current.duration) *
                100
            )
          );
        }
        mainContext.setProgress(progressNum);
      }, 50);
      return () => {
        clearInterval(checkBufferInterval);
      };
    }
  }, [mainContext.loaded]);

  return (
    <video
      ref={videoRef}
      playsInline={true}
      autoPlay
      muted
      loop
      preload={"auto"}
      className="object-cover w-[120%] h-[120%] absolute -left-10 -top-40 sepia-[.25] saturate-100 blur-sm bg-black">
      <source type="video/mp4" src="/501_501-0536.mp4"></source>
    </video>
  );
};

export default Video;
