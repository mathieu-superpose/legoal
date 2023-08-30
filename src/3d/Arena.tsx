import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function Arena() {
  const [
    colorMapGray,
    colorMapGreen,
    displacementMap,
    normalMap,
    roughnessMap,
    aoMap,
  ] = useTexture([
    "/textures/lego/Lego_COLOR_A.jpg",
    "/textures/lego/Lego_COLOR_C.jpg",
    "/textures/lego/Lego_DISP.png",
    "/textures/lego/Lego_NORM.jpg",
    "/textures/lego/Lego_ROUGH.jpg",
    "/textures/lego/Lego_OCC.jpg",
  ]);

  useEffect(() => {
    [
      colorMapGray,
      colorMapGreen,
      displacementMap,
      normalMap,
      roughnessMap,
      aoMap,
    ].forEach((m) => {
      m.wrapS = THREE.RepeatWrapping;
      m.wrapT = THREE.RepeatWrapping;
      m.repeat.set(4, 4);
      m.needsUpdate = true;
    });
  }, [
    colorMapGray,
    colorMapGreen,
    displacementMap,
    normalMap,
    roughnessMap,
    aoMap,
  ]);

  return (
    <group>
      <mesh
      position={[0, 0.01, 0]}
      >
        <boxGeometry args={[22, 1, 12]} />
        <meshStandardMaterial
          attach="material"
          color="olivedrab"
          map={colorMapGreen}
          normalMap={normalMap}
          displacementMap={displacementMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
      <RigidBody type="fixed" colliders={"cuboid"}>
        <mesh>
          <boxGeometry args={[26, 1, 16]} />
          <meshStandardMaterial
            attach="material"
            color="silver"
            map={colorMapGray}
            normalMap={normalMap}
            displacementMap={displacementMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap}
          />
        </mesh>
      </RigidBody>
    </group>
  );
}
