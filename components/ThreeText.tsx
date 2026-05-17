"use client";

import { Text } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";
import { useMemo } from "react";

type ThreeTextProps = {
  sentence: string;
};

const ThreeText = ({ sentence }: ThreeTextProps) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const material = useMemo(
    () =>
      new THREE.MeshLambertMaterial({
        color: "white",
      }),
    [],
  );

  return sentence.split(" ").map((word, i) => (
    <Text
      key={i}
      anchorX="center"
      anchorY="middle"
      scale={isDesktop ? 0.8 : 0.5}
      // material={material}
      color="white"
    >
      {word.toUpperCase()}
    </Text>
  ));
};

export default ThreeText;
