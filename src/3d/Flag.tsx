import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    part344: THREE.Mesh;
    part399: THREE.Mesh;
  };
  materials: {
    ["mb:o:245:194"]: THREE.MeshStandardMaterial;
    ["mb:o:1464:106"]: THREE.MeshStandardMaterial;
  };
};

const MODEL = "3d/stadium/flag.glb";

export default function Flag({
  position,
  rotation,
  color,
}: {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  color: THREE.Color;
}) {
  const { nodes, materials } = useGLTF(MODEL) as GLTFResult;
  const flagMaterial = new THREE.MeshStandardMaterial().copy(materials["mb:o:1464:106"])

  flagMaterial.color = color;

  return (
    <group dispose={null} position={position} rotation={rotation} scale={0.05}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.part344.geometry}
        material={materials["mb:o:245:194"]}
        position={[0, -0.01, 0]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.part399.geometry}
        material={flagMaterial}
        position={[-0.8, 28.79, 0]}
        rotation={[Math.PI / 2, 0, 2.618]}
      />
    </group>
  );
}

useGLTF.preload(MODEL);
