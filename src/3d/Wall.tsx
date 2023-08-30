import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

type GLTFResult = GLTF & {
  nodes: {
    part385: THREE.Mesh;
  };
  materials: {
    ["mb:o:895:23"]: THREE.MeshStandardMaterial;
  };
};

const MODEL = "3d/stadium/wall.glb";

export default function Wall({
  position,
  rotation,
}: {
  position: THREE.Vector3;
  rotation: THREE.Euler;
}) {
  const { nodes, materials } = useGLTF(MODEL) as GLTFResult;
  return (
    <group dispose={null} position={position} rotation={rotation}>
      <RigidBody colliders={false} type="fixed">
        <mesh
          scale={0.07}
          castShadow
          receiveShadow
          geometry={nodes.part385.geometry}
          material={materials["mb:o:895:23"]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <CuboidCollider 
          args={[1.7, 0.5, 0.3]}
          position={[0, 1, -0.2]}
          restitution={0.9}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload(MODEL);
