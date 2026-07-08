"use client";

import gsap from "@/lib/gsap";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";

// Constants
import { FLAVORS } from "@/constants/flavors";

// Components
import FloatingCan from "@/components/FloatingCan";
import { WavyCircles } from "@/components/WavyCircles";

// Icon
import { ChevronLeft } from "lucide-react";

const SPINS_ON_CHANGE = 8;

const Carousel = () => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sodaCanRef = useRef<Group>(null);

  const changeFlavor = (index: number) => {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline({
      onStart: () => setIsAnimating(true),
      onComplete: () => setIsAnimating(false),
      invalidateOnRefresh: true,
    });

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          fill: FLAVORS[nextIndex].bg,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  };

  return (
    <section className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center pt-20 pb-5 text-white">
      <WavyCircles
        className="absolute top-1/2 left-1/2 -z-1 h-[100vmin] -translate-x-1/2 -translate-y-1/2"
        style={{ color: FLAVORS[0].bg }}
      />

      <h2 className="relative text-center text-5xl font-bold">
        O que quer sentir hoje?
      </h2>

      <div className="grid grid-cols-[repeat(3,auto)] items-center">
        {/* Left */}
        <button
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          disabled={isAnimating}
          aria-label="Previous Flavor"
          className="relative z-1"
        >
          <ChevronLeft style={{ scale: 3 }} />
        </button>

        {/* Can */}
        <View className="relative z-50 aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.2]}>
            <group>
              <FloatingCan
                ref={sodaCanRef}
                floatIntensity={0.3}
                rotationIntensity={1}
                flavor={FLAVORS[currentFlavorIndex].key}
              />
            </group>
          </Center>

          <Environment
            files="/hdr/field.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        {/* Right */}
        <button
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          disabled={isAnimating}
          aria-label="Next Flavor"
          className="disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft style={{ transform: "scaleX(-1)", scale: 3 }} />
        </button>
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].label}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90"></div>
      </div>
    </section>
  );
};

export default Carousel;
