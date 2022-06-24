import ProfileCard from "./ProfileCard";
import Video from "./Video";
import dynamic from "next/dynamic";

import { useSpring, animated as a } from "react-spring";

import { useState, useContext, useEffect, Suspense } from "react";

import { MainContext } from "./Contexts";

import { updateSpring } from "./Springs";

const MainContent = () => {
  const [mouseOver, setMouseOver] = useState(false);
  const mainContext = useContext(MainContext);

  const [videoSpring, videoSpringApi] = useSpring(() => ({
    config: {
      mass: 1,
      tension: 200,
      friction: 15,
      clamp: false,
    },
    opacity: 0,
    scale: 1,
    x: 0,
    y: 0,
  }));

  useEffect(() => {
    if (mainContext.loaded) {
      updateSpring(videoSpringApi, { opacity: 0.5, scale: 1.3 });
    }
  }, [mainContext, videoSpringApi]);

  useEffect(() => {
    if (mainContext.loaded) {
      if (mouseOver) {
        updateSpring(videoSpringApi, {
          opacity: 1,
          scale: 1.3,
        });
        const interval = setInterval(() => {
          const x = Date.now() * 0.00005;
          updateSpring(videoSpringApi, {
            x: Math.sin(x) * 240,
            y: Math.cos(x) * 120,
          });
        }, 50);
        return () => {
          clearInterval(interval);
        };
      } else {
        updateSpring(videoSpringApi, { opacity: 0.5, scale: 1.05, x: 0, y: 0 });
      }
    }
  }, [mouseOver, videoSpringApi]);

  const onMouseEnter = () => {
    setMouseOver(true);
  };

  const onMouseLeave = () => {
    setMouseOver(false);
  };

  return (
    <>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <a.div style={videoSpring} className="fixed w-screen h-screen">
          <Video />
        </a.div>
        <div
          style={{ boxShadow: "inset 0 0 1900px black" }}
          className="w-screen h-screen fixed">
          <ProfileCard />
        </div>
      </div>
    </>
  );
};

export default MainContent;
