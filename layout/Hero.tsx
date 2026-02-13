"use client";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

// Context
import { useSections } from "@/contexts/SectionsContext";
import { useScene } from "@/contexts/Scene";

// Lib
import gsap from "@/lib/gsap";

const Hero = () => {
  const { heroRef } = useSections();
  const { ready } = useScene();

  const initialTextAnim = () => {
    const split = SplitText.create(".headline", {
      type: "words",
    });

    const introTl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
    });

    introTl
      .to(heroRef.current, {
        opacity: 1,
      })
      .from(split.words, {
        y: 80,
        stagger: 0.1,
        duration: 1.5,
        opacity: 0,
      })
      .from(
        ".paragraph",
        {
          y: 20,
          duration: 1,
          opacity: 0,
        },
        "-=0.5",
      )
      .from(".btn", {
        y: 20,
        duration: 0.8,
        opacity: 0,
      });
  };

  useGSAP(
    () => {
      if (!heroRef.current || !ready) return;

      initialTextAnim();
    },
    { scope: heroRef, dependencies: [ready] },
  );

  return (
    <main
      ref={heroRef}
      className="hero section items-center justify-center overflow-hidden opacity-0"
    >
      {/* Text */}
      <div className="text-blue-dark flex flex-col items-center justify-center">
        <h1 className="headline text-center">
          VIVA
          <br />
          <span>INTENSAMENTE</span>
        </h1>
        <p className="paragraph">Menos açúcar, mais proteína</p>
        <button className="btn">COMPRAR AGORA</button>
      </div>
    </main>
  );
};

export default Hero;
