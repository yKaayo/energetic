"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";

// Component
import Can from "./Can";
import FloatingCan from "./FloatingCan";

const ViewCanvas = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: -1,
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        fov: 30,
      }}
    >
      <FloatingCan />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </Canvas>
  );
};

export default ViewCanvas;
