"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  useGSAP(() => {});

  return (
    <main className="section  items-center justify-center">
      {/* Text */}
      <div className="flex flex-col">
        <h1 className="text-center">
          VIVA
          <br />
          INTENSAMENTE
        </h1>
        <p>Menos açúcar, mais proteína</p>
        <button>Comprar agora</button>
      </div>
    </main>
  );
};

export default Hero;
