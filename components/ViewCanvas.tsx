"use client";

import { Canvas } from "@react-three/fiber";
import { View, Stats } from "@react-three/drei";
import { Suspense } from "react";

const ViewCanvas = () => {
  return (
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
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
