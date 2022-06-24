import dynamic from "next/dynamic";
import { useState, useRef, useEffect, Suspense, useContext } from "react";
import { MainContext } from "./Contexts";
import { useSpring } from "react-spring";

import Load from "./Load";
import MainContent from "./MainContent";

const Main = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      setIsDark(true);
  });

  const [circleLoadSpring, circleLoadSpringApi] = useSpring(() => ({
    config: {
      mass: 1,
      tension: 200,
      friction: 20,
      clamp: true,
    },
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      scale: 1.1,
    },
  }));

  useEffect(() => {
    if (progress === 100) {
      setLoaded(true);
      const loadFadeOut = setTimeout(() => {
        circleLoadSpringApi.start({
          scale: 0.8,
          opacity: 0,
        });
      }, 3000);
      return () => {
        clearTimeout(loadFadeOut);
      };
    }
  }, [progress]);

  return (
    <>
      <MainContext.Provider
        value={{
          progress,
          setProgress,
          loaded,
          setLoaded,
          isDark,
          setIsDark,
          mouseOver,
          setMouseOver,
        }}>
        <div className="dark:bg-zinc-900 bg-zinc-400 w-screen h-screen">
          <Load style={circleLoadSpring} />
          <MainContent />
        </div>
      </MainContext.Provider>
    </>
  );
};

export default Main;
