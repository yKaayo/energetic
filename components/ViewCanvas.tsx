"use client";

import { Canvas } from "@react-three/fiber";
import { View, Stats } from "@react-three/drei";
import { Suspense } from "react";

const ViewCanvas = () => {
  return (
    <Canvas
      style={{
        height: "100vh",
        position: "fixed",
        inset: 0,
        overflow: "visible",
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{
        position: [0, 0, 5.15],
        fov: 30,
      }}
    >
      <Suspense fallback={null}>
        <View.Port />
      </Suspense>

      {/* <Stats /> */}
    </Canvas>
  );
};

export default ViewCanvas;
