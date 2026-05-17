"use client";

import { createContext, useContext, useRef } from "react";

type SectionsContextType = {
  heroRef: React.RefObject<HTMLDivElement | null>;
  flavorsRef: React.RefObject<HTMLDivElement | null>;
  sceneViewRef: React.RefObject<HTMLDivElement | null>;
  fallRef: React.RefObject<HTMLDivElement | null>;
};

const SectionsContext = createContext<SectionsContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function SectionsProvider({ children }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const flavorsRef = useRef<HTMLDivElement>(null);
  const sceneViewRef = useRef<HTMLDivElement>(null);
  const fallRef = useRef<HTMLDivElement>(null);

  return (
    <SectionsContext.Provider value={{ heroRef, flavorsRef, sceneViewRef, fallRef }}>
      {children}
    </SectionsContext.Provider>
  );
}

export function useSections() {
  const context = useContext(SectionsContext);

  if (!context) {
    throw new Error("useSections must be used inside SectionsProvider");
  }

  return context;
}
