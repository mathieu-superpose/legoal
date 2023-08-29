import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Arena() {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] =
    useTexture([
      "/textures/lego/Lego_COLOR_C.jpg",
      "/textures/lego/Lego_DISP.png",
      "/textures/lego/Lego_NORM.jpg",
      "/textures/lego/Lego_ROUGH.jpg",
      "/textures/lego/Lego_OCC.jpg",
    ]);

  useEffect(() => {
    [colorMap, displacementMap, normalMap, roughnessMap, aoMap].forEach((m) => {
      m.wrapS = THREE.RepeatWrapping;
      m.wrapT = THREE.RepeatWrapping;
      m.repeat.set(4, 4);
      m.needsUpdate = true;
    });
  }, [colorMap, displacementMap, normalMap, roughnessMap, aoMap]);

  return (
    <RigidBody type="fixed" colliders={"cuboid"}>
      <mesh scale={1}>
        <boxGeometry args={[22, 1, 12]} />
        <meshStandardMaterial
          attach="material"
          color="green"
          map={colorMap}
          normalMap={normalMap}
          displacementMap={displacementMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
    </RigidBody>
  );
}
