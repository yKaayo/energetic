"use client";

import { Canvas } from "@react-three/fiber";

// Component
import Can from "./Can";
import { Environment } from "@react-three/drei";

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
        zIndex: 30,
      }}
      shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
    >
      <Can />
      <Environment files="/hdr/field.hdr" />
    </Canvas>
  );
};

export default ViewCanvas;
