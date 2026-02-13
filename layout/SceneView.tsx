"use client";

import { View } from "@react-three/drei";

// Components
import Scene from "@/components/Scene";
import ViewCanvas from "@/components/ViewCanvas";

const SceneView = () => {
  return (
    <>
      <ViewCanvas />

      <View className="fixed top-0 left-0 hidden h-screen w-screen overflow-hidden md:block">
        <Scene />
      </View>
    </>
  );
};

export default SceneView;
