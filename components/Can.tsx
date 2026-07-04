"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Constants
import {
  FLAVOR_IDS,
  FLAVOR_TEXTURES,
  type FlavorKey,
} from "@/constants/flavors";

useGLTF.preload("/model/Soda-can.gltf");

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: FlavorKey;
  scale?: number;
};

export default function Can({ flavor, scale = 2, ...props }: SodaCanProps) {
  const { nodes } = useGLTF("/model/Soda-can.gltf");

  const labels = useTexture(FLAVOR_TEXTURES);
  const label = flavor ? labels[flavor] : undefined;

  // Invert the texture 90 degrees
  FLAVOR_IDS.forEach((num) => (labels[`texture${num}`].flipY = false));

  return (
    <group
      {...props}
      dispose={null}
      scale={scale}
      rotation={[0, -Math.PI * 1.25, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Mesh as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Mesh_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
    </group>
  );
}
