"use client";

import { View } from "@react-three/drei";

// Components
import Scene from "@/components/Scene";
import ViewCanvas from "@/components/ViewCanvas";

// Context
import { useSections } from "@/contexts/SectionsContext";

const SceneView = () => {
  const { sceneViewRef } = useSections();

  return (
    <>
      <ViewCanvas />

      <div ref={sceneViewRef} className="absolute hidden h-screen w-full md:block overflow-visible">
        <View className="h-full w-full">
          <Scene />
        </View>
      </div>
    </>
  );
};

export default SceneView;
