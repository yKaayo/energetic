// Layout
import Flavors from "@/layout/Flavors";
import Hero from "@/layout/Hero";
import SceneView from "@/layout/SceneView";

// Context
import { SectionsProvider } from "@/contexts/SectionsContext";

export default function Home() {
  return (
    <SectionsProvider>
      <SceneView />
      <Hero />
      <Flavors />
    </SectionsProvider>
  );
}
