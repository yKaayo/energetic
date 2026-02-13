// Layout
import Flavors from "@/layout/Flavors";
import Hero from "@/layout/Hero";
import SceneView from "@/layout/SceneView";

// Component
import LiquidChrome from "@/components/LiquidChrome";

// Context
import AppProvider from "@/contexts/AppProvider";

export default function Home() {
  return (
    <AppProvider>
      <SceneView />
      <LiquidChrome
        baseColor={[0.1, 0.1, 0.1]}
        speed={1}
        amplitude={0.6}
        interactive={true}
      />
      <Hero />
      <Flavors />
    </AppProvider>
  );
}
