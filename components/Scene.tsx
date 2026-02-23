"use client";

import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { useGSAP } from "@gsap/react";

// Lib
import gsap from "@/lib/gsap";

// Component
import FloatingCan from "@/components/FloatingCan";

// Context
import { useSections } from "@/contexts/SectionsContext";
import { useScene } from "@/contexts/Scene";

const Scene = () => {
  const { heroRef, flavorsRef, sceneViewRef } = useSections();
  const { isReady } = useScene();

  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const group1Ref = useRef<Group>(null);
  const group2Ref = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  const initialPosition = () => {
    gsap.set(can1Ref.current!.position, { x: -1.5 });
    gsap.set(can1Ref.current!.rotation, { z: -0.3 });

    gsap.set(can2Ref.current!.position, { x: 1.5 });
    gsap.set(can2Ref.current!.rotation, { z: 0.3 });

    gsap.set(can3Ref.current!.position, { x: 2, y: 4 });
    gsap.set(can4Ref.current!.position, { y: 5 });
    gsap.set(can5Ref.current!.position, { x: -1, y: -4 });
  };

  const initialAnimation = () => {
    const introTl = gsap.timeline({
      defaults: {
        duration: 2.5,
        ease: "power2.inOut",
      },
    });

    return introTl
      .from(can1Ref.current!.position, { x: 1, y: 3 }, 0)
      .from(can1Ref.current!.rotation, { z: 3 }, 0)
      .from(can2Ref.current!.position, { x: 1, y: -3 }, 0)
      .from(can2Ref.current!.rotation, { z: -3 }, 0);
  };

  const heroScrollAnimation = () => {
    const scrollTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "power3.inOut",
      },
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 3,
      },
    });

    scrollTl
      .to(groupRef.current!.rotation, { y: Math.PI * 2 })

      .to(can1Ref.current!.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current!.rotation, { z: 0.3 }, 0)

      .to(can2Ref.current!.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current!.rotation, { z: 0 }, 0)

      .to(can3Ref.current!.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current!.rotation, { z: -0.1 }, 0)

      .to(can4Ref.current!.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current!.rotation, { z: 0.3 }, 0)

      .to(can5Ref.current!.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current!.rotation, { z: -0.25 }, 0)
      .to(
        groupRef.current!.position,
        { x: 1, duration: 3, ease: "sine.inOut" },
        1.3,
      );
  };

  const pinScene = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        endTrigger: flavorsRef.current,
        end: "top top",
        scrub: true,
        pin: sceneViewRef.current,
        pinSpacing: false,
      },
    });
  };

  useGSAP(() => {
    if (
      !heroRef.current ||
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !group1Ref.current ||
      !group2Ref.current ||
      !groupRef.current
    )
      return;

    isReady();

    initialPosition();
    initialAnimation();
    heroScrollAnimation();
    pinScene();
  });

  return (
    <group ref={groupRef}>
      <group ref={group1Ref}>
        <FloatingCan ref={can1Ref} flavor="texture5" />
        <FloatingCan ref={can2Ref} flavor="texture4" />
      </group>

      <group ref={group2Ref}>
        <FloatingCan ref={can3Ref} flavor="texture3" />
        <FloatingCan ref={can4Ref} flavor="texture2" />
        <FloatingCan ref={can5Ref} flavor="texture1" />
      </group>

      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
};

export default Scene;
