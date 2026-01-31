import { Float } from "@react-three/drei";

// Component
import Can, { SodaCanProps } from "./Can";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: React.ReactNode;
};

const FloatingCan = ({
  flavor = "texture5",
  speed = 1.25,
  rotationIntensity = 3,
  floatIntensity = 1,
  floatingRange = [-0.3, 0.3],
}: FloatingCanProps) => {
  return (
    <Float
      speed={speed} // Animation speed, defaults to 1
      rotationIntensity={rotationIntensity} // XYZ rotation intensity, defaults to 1
      floatIntensity={floatIntensity} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={floatingRange} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <Can flavor={flavor} />
    </Float>
  );
};

export default FloatingCan;
