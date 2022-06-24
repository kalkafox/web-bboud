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

  const backgroundAnimation = () => {
    const interval = setInterval(() => {
      const x = Date.now() * 0.00005;
      updateSpring(videoSpringApi, {
        x: Math.sin(x) * 240,
        y: Math.cos(x) * 120,
      });
    }, 50);
    return interval;
  };

  useEffect(() => {
    if (mainContext.loaded) {
      updateSpring(videoSpringApi, { opacity: 1, scale: 1.1 });
      const interval = backgroundAnimation();
      return () => clearInterval(interval);
    }
  }, [mainContext.loaded]);

  const onMouseEnter = () => {
    setMouseOver(true);
  };

  const onMouseLeave = () => {
    setMouseOver(false);
  };

  return (
    <>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={() => setMouseOver(true)}>
        <a.div style={videoSpring} className="fixed w-[140%] h-[120%] -top-96">
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
