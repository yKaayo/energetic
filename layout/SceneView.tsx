"use client";

import { View } from "@react-three/drei";

// Components
import Scene from "@/components/Scene";
import ViewCanvas from "@/components/ViewCanvas";

const SceneView = () => {
  return (
    <div className="-z-1 relative">
      <ViewCanvas />

      <View className="h-screen w-screen z-50 hidden md:block fixed top-0 left-0 overflow-hidden">
        <Scene />
      </View>
    </div>
  );
};

export default SceneView;
