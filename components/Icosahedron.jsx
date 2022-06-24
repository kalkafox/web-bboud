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
    if (context.context.mainContext.isDark) {
      mesh.current.material.color.set(materialColors[0]);
    } else {
      mesh.current.material.color.set(materialColors[1]);
    }
    mesh.current.rotation.x += 0.2 * delta;
    mesh.current.rotation.y += 0.5 * delta;
  });
  return (
    <mesh ref={mesh} style={springs} scale={1}>
      <icosahedronGeometry />
      <meshPhongMaterial color="#efefef" />
    </mesh>
  );
};

export default Icosahedron;
