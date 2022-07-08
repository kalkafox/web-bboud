import dynamic from "next/dynamic";
import { animated as a, useSpring } from "react-spring";

import { Suspense, useState } from "react";

import { Canvas } from "@react-three/fiber";

import ProfileCardContent from "./ProfileCardContent";

import { useContext, useEffect } from "react";

import { MainContext } from "./Contexts";

import Icosahedron from "./Icosahedron";

const ProfileCard = () => {
  const [mouseOver, setMouseOver] = useState(false);
  const mainContext = useContext(MainContext);
  const [profileCardSpring, profileCardSpringApi] = useSpring(() => ({
    config: {
      mass: 1,
      tension: 200,
      friction: 10,
      clamp: false,
    },
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  }));

  return (
    <div className="fixed grid justify-center justify-items-center content-center items-center object-center w-full h-full">
      <a.div
        style={profileCardSpring}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        className="w-[800px] h-[400px] bg-zinc-300/40 border-zinc-900/70 hover:border-zinc-900 dark:border-zinc-300/70 border-2 hover:dark:border-zinc-300 transition-colors dark:bg-zinc-900/40 dark:text-zinc-300 text-zinc-900 backdrop-blur-lg absolute top-24 text-center rounded-3xl">
        <div className="w-32 h-32 absolute left-2 right-0 m-auto top-4 text-center">
          <Canvas camera={{ zoom: 3, position: [3, 3, 10] }}>
            <directionalLight scale={3} intensity={0.8} position={[0, 1, 8]} />
            <Icosahedron context={{ mouseOver, mainContext }} />
          </Canvas>
        </div>
        <ProfileCardContent />
      </a.div>
    </div>
  );
};

export default ProfileCard;
