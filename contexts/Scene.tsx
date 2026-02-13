"use client";

import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type SceneContextType = {
  ready: boolean;
  isReady: () => void;
};

const SceneContext = createContext<SceneContextType | null>(null);

export function SceneProvider({ children }: Props) {
  const [ready, setReady] = useState(false);
  const isReady = () => setReady(true);

  return (
    <SceneContext.Provider value={{ ready, isReady }}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);

  if (!context) {
    throw new Error("useScene must be used inside SceneProvider");
  }

  return context;
}
