"use client";

import { Environment, View } from "@react-three/drei";

// Lib
import gsap from "@/lib/gsap";

// Components
import Can from "@/components/Can";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Fall = () => {
  const fallRef = useRef<HTMLElement>(null);

  const pinScene = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: fallRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });
  };

  useGSAP(() => {
    pinScene();
  });

  return (
    <section ref={fallRef} className="min-h-[200vh]">
      <View className="h-screen w-full">
        <Can flavor="texture5" />
        <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
      </View>
    </section>
  );
};

export default Fall;
