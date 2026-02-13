"use client";

import { SectionsProvider } from "./SectionsContext";
import { SceneProvider } from "./Scene";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SceneProvider>
      <SectionsProvider>{children}</SectionsProvider>
    </SceneProvider>
  );
};

export default AppProvider