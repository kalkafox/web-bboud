import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";

const Color = require("color");

// have these values stored in the memory and just be called within the icosahedron frame render

const materialColors = [
  Color("#efefef").rgb(), //dark mode
  Color("#545454").rgb(), //light mode
];

const Icosahedron = (context) => {
  console.log(context.context.mainContext.isDark);
  const springs = useSpring({ scale: context.context.mouseOver ? 1.4 : 1 });
  const mesh = useRef();
  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.2 * delta;
    mesh.current.rotation.y += 0.5 * delta;
  });
  return (
    <mesh ref={mesh} style={springs} scale={2.5} position={[0, 0, 0]}>
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
    </mesh>
  );
};

export default Icosahedron;
