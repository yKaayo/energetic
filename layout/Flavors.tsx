"use client";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

// Lib
import gsap from "@/lib/gsap";

// Context
import { useScene } from "@/contexts/Scene";

const Flavors = () => {
  const flavorsRef = useRef(null);

  const { ready } = useScene();

  const initialTextAnim = () => {
    const split = SplitText.create(".headline", {
      type: "words",
    });

    const introTl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      scrollTrigger: {
        trigger: flavorsRef.current,
        start: "top 45%",
        end: "5% 30%",
        scrub: 2,
      },
    });

    introTl
      .from(split.words, {
        y: 80,
        stagger: 0.1,
        duration: 1.5,
        opacity: 0,
      })
      .from(".paragraph", {
        y: 20,
        duration: 1,
        opacity: 0,
      });
  };

  useGSAP(
    () => {
      if (!flavorsRef.current || !ready) return;

      initialTextAnim();
    },
    { scope: flavorsRef, dependencies: [ready] },
  );

  return (
    <section ref={flavorsRef} className="section items-center">
      {/* Text */}
      <div className="flex flex-col md:w-1/2">
        <h2 className="headline">
          Prove todos nossos <span>sabores</span>
        </h2>
        <p className="paragraph">
          Nosso energético é feito com sabores característicos com o mínimo de
          açúcar. Prove os sabores e descubra seu favorito!
        </p>
      </div>
    </section>
  );
};

export default Flavors;
