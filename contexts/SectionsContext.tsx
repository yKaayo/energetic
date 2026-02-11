"use client";

import { createContext, useContext, useRef } from "react";

type SectionsContextType = {
  heroRef: React.RefObject<HTMLDivElement | null>;
};

const SectionsContext = createContext<SectionsContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function SectionsProvider({ children }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <SectionsContext.Provider value={{ heroRef }}>
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
