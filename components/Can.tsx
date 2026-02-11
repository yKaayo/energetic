"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/model/Soda-can.gltf");

const flavorTextures = Object.fromEntries(
  [1, 2, 3, 4, 5].map((num) => [
    `texture${num}`,
    `/textures/texture${num}.png`,
  ]),
);

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export default function Can({ flavor, scale = 2, ...props }: SodaCanProps) {
  const { nodes } = useGLTF("/model/Soda-can.gltf");

  const labels = useTexture(flavorTextures);
  const label = flavor ? labels[flavor] : undefined;

  [1, 2, 3, 4, 5].forEach((num) => (labels[`texture${num}`].flipY = false));

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
