import { Canvas } from "@react-three/fiber";
import { KeyboardControls, Loader } from "@react-three/drei";

import Scene from "./scenes/Scene";

import "./Experience.css";

export default function Experience() {
  return (
    <div className="Experience">
      <KeyboardControls
        map={[
          { name: "up", keys: ["ArrowUp"] },
          { name: "down", keys: ["ArrowDown"] },
          { name: "left", keys: ["ArrowLeft"] },
          { name: "right", keys: ["ArrowRight"] },
          { name: "shoot", keys: ["KeyX"] },
        ]}
      >
        <Canvas
          shadows
          camera={{
            position: [0, 15, 11],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <Scene />
        </Canvas>
        <Loader />
      </KeyboardControls>
    </div>
  );
}
