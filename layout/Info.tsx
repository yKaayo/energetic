"use client";

import { useGSAP } from "@gsap/react";
import { Environment, View } from "@react-three/drei";
import { invalidate } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group } from "three";
import { SplitText } from "gsap/SplitText";

// Lib
import gsap from "@/lib/gsap";

// Component
import FloatingCan from "@/components/FloatingCan";

// Constant
import { INFO_TEXTS } from "@/constants/infoTexts";

const Info = () => {
  const canRef = useRef<Group>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [canReady, setCanReady] = useState(false);

  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const initialPosition = () => {
    gsap.set(can1Ref.current!.position, { x: -2 });
    gsap.set(can2Ref.current!.position, { x: -1 });
    gsap.set(can4Ref.current!.position, { x: 1 });
    gsap.set(can5Ref.current!.position, { x: 2 });
  };

  useGSAP(
    () => {
      if (!canReady || !canRef.current || !infoRef.current) return;
      if (
        !can1Ref.current ||
        !can2Ref.current ||
        !can4Ref.current ||
        !can5Ref.current
      )
        return;

      initialPosition();

      const sections = gsap.utils.toArray<HTMLElement>("section");
      const splits: SplitText[] = [];

      sections.forEach((section, index) => {
        const isOdd = index % 2 !== 0;
        const isLast = index === sections.length - 1;

        if (index !== 0) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: true,
                onUpdate: () => invalidate(),
                invalidateOnRefresh: true,
              },
            })
            .to(canRef.current!.position, {
              x: isLast ? 0 : isOdd ? -1 : 1,
              ease: "power2.inOut",
            })
            .to(
              canRef.current!.rotation,
              {
                z: isLast ? 0 : isOdd ? 0.25 : -0.25,
                ease: "power2.inOut",
              },
              "<",
            );
        }

        const headlineEl = section.querySelector<HTMLElement>(".info-headline");
        const paragraphEl =
          section.querySelector<HTMLElement>(".info-paragraph");

        if (!headlineEl || !paragraphEl) return;

        const split = SplitText.create(headlineEl, { type: "words" });
        splits.push(split);

        gsap
          .timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          .from(split.words, {
            y: 80,
            stagger: 0.1,
            duration: 1.5,
            opacity: 0,
          })
          .from(paragraphEl, {
            y: 20,
            duration: 1,
            opacity: 0,
          });
      });
    },
    { scope: infoRef, dependencies: [canReady] },
  );

  return (
    <div ref={infoRef} className="relative container mx-auto">
      <div className="pointer-events-none sticky top-0 h-0">
        <View className="h-svh w-full">
          <group
            ref={(node) => {
              canRef.current = node;
              if (node && !canReady) setCanReady(true);
            }}
            position-x={1}
          >
            <FloatingCan flavor="texture3" />
          </group>

          <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
        </View>
      </div>

      {INFO_TEXTS.map((info, i) => (
        <section
          key={info.id}
          className={`flex h-svh w-[55%] flex-col justify-center ${i % 2 !== 0 ? "ms-auto" : ""}`}
        >
          <h2 className="info-headline headline">{info.title}</h2>
          <p className="info-paragraph paragraph">{info.text}</p>
        </section>
      ))}

      <section>
        <View className="h-svh">
          <group>
            <FloatingCan ref={can1Ref} flavor="texture1" />
            <FloatingCan ref={can2Ref} flavor="texture2" />
            <FloatingCan ref={can4Ref} flavor="texture4" />
            <FloatingCan ref={can5Ref} flavor="texture5" />
          </group>

          <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
        </View>
      </section>
    </div>
  );
};

export default Info;
