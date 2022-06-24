import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useSpring, animated as a } from "@react-spring/three";

const Color = require("color");

// have these values stored in the memory and just be called within the icosahedron frame render

const materialColors = [
  Color("#efefef").rgb(), //dark mode
  Color("#545454").rgb(), //light mode
];

const Icosahedron = (context) => {
  const { scale, rotateZ } = useSpring({
    scale: context.context.mouseOver ? 2.5 : 2,
    config: { friction: 5, tension: 200 },
  });
  const mesh = useRef();
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.2 * delta;
    mesh.current.rotation.y += 0.5 * delta;
  });
  return (
    <a.mesh ref={mesh} scale={scale} position={[0, 0, 0]}>
      <icosahedronGeometry />
      <meshPhongMaterial
        shininess={437}
        refractionRatio={2}
        color={
          context.context.mainContext.isDark
            ? materialColors[0].hex()
            : materialColors[1].hex()
        }
      />
    </a.mesh>
  );
};

export default Icosahedron;
