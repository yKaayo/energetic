"use client";

import { Environment, View } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Group } from "three";

// Lib
import gsap from "@/lib/gsap";

// Context
import { useSections } from "@/contexts/SectionsContext";
import { useScene } from "@/contexts/Scene";

// Components
import ThreeText from "@/components/ThreeText";
import FloatingCan from "@/components/FloatingCan";

const Fall = () => {
  const { fallRef } = useSections();
  const { ready } = useScene();

  const canRef = useRef<Group>(null);
  const textRef = useRef<Group>(null);

  const ANGLE = 75 * (Math.PI / 180);

  const getX = (distance: number) => {
    return distance * Math.cos(ANGLE);
  };
  const getY = (distance: number) => {
    return distance * Math.sin(ANGLE);
  };

  const getPositions = (distance: number) => ({
    x: getX(distance),
    y: getY(-1 * distance),
  });

  const initialAnim = () => {
    if (!canRef.current || !textRef.current) return;

    gsap.set(canRef.current.position, { ...getPositions(-4) });
    gsap.set(
      textRef.current.children.map((word) => word.position),
      { ...getPositions(7) },
    );
    gsap.to(canRef.current.rotation, {
      y: -Math.PI * 2,
      repeat: -1,
      ease: "none",
      duration: 4,
    });
  };

  const timelineAnim = () => {
    if (!canRef.current || !textRef.current) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: fallRef.current,
        pin: true,
        start: "top top",
        end: "+=3000",
        scrub: 1.7,
      },
    });

    scrollTl
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      .to(
        textRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getPositions(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0,
      )
      .to(canRef.current.position, {
        ...getPositions(4),
        ease: "back.inOut",
      });
  };

  useGSAP(
    () => {
      if (!ready) return;

      initialAnim();
      timelineAnim();
    },
    { scope: fallRef, dependencies: [ready] },
  );

  return (
    <section ref={fallRef} className="min-h-[150vh]">
      <View className="h-screen w-full">
        <group rotation={[Math.PI / 10, -Math.PI / 9, Math.PI / 5]}>
          <FloatingCan
            ref={canRef}
            flavor="texture5"
            floatIntensity={0}
            rotationIntensity={1}
            floatingRange={[0, 0]}
          />
        </group>

        <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />

        {/* Text */}
        <group ref={textRef}>
          <ThreeText sentence="Energia Sem Pausa" />
        </group>
      </View>
    </section>
  );
};

export default Fall;
