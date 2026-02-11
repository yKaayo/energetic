"use client";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

// Context
import { useSections } from "@/contexts/SectionsContext";

// Lib
import gsap from "@/lib/gsap";

const Hero = () => {
  const { heroRef } = useSections();

  const initialTextAnim = () => {
    const split = SplitText.create(".headline", {
      type: "words",
    });

    const introTl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
        opacity: 0,
      },
    });

    introTl
      .from(split.words, {
        y: 80,
        stagger: 0.1,
        duration: 1.5,
      })
      .from(
        ".paragraph",
        {
          y: 20,
          duration: 1,
        },
        "-=0.5",
      )
      .from(".btn", {
        y: 20,
        duration: 0.8,
      });
  };

  useGSAP(
    () => {
      if (!heroRef.current) return;

      initialTextAnim();
    },
    { scope: heroRef },
  );

  return (
    <main
      ref={heroRef}
      className="hero section items-center justify-center overflow-hidden"
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
