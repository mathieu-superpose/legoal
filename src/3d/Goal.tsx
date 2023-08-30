import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import useGame from "../store/useGame";

type GLTFResult = GLTF & {
  nodes: {
    part003: THREE.Mesh;
    part004: THREE.Mesh;
    part005: THREE.Mesh;
    part038: THREE.Mesh;
    part039: THREE.Mesh;
    part066: THREE.Mesh;
    part067: THREE.Mesh;
    part160: THREE.Mesh;
    part161: THREE.Mesh;
    part330: THREE.Mesh;
    part331: THREE.Mesh;
    part337: THREE.Mesh;
    part338: THREE.Mesh;
    part339: THREE.Mesh;
    part393: THREE.Mesh;
    part394: THREE.Mesh;
    part425: THREE.Mesh;
    part428: THREE.Mesh;
    part336: THREE.Mesh;
  };
  materials: {
    ["mb:o:5926:1"]: THREE.MeshStandardMaterial;
    ["mb:o:176:1"]: THREE.MeshStandardMaterial;
    ["mb:o:63:1"]: THREE.MeshStandardMaterial;
    ["mb:o:4:1"]: THREE.MeshStandardMaterial;
    ["mb:o:371:1"]: THREE.MeshStandardMaterial;
    ["mb:o:2:1"]: THREE.MeshStandardMaterial;
    ["mb:o:162:1"]: THREE.MeshStandardMaterial;
    ["mb:o:256:1"]: THREE.MeshStandardMaterial;
    ["mb:o:18602:1"]: THREE.MeshStandardMaterial;
  };
};

const MODEL = "3d/stadium/goal.glb";

export default function Goal({
  position,
  rotation,
  team,
}: {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  team: "red" | "blue";
}) {
  const { nodes, materials } = useGLTF(MODEL) as GLTFResult;
  const increasePoints = useGame((state) => state.increasePoints);

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type={"fixed"} colliders={false}>
        <CuboidCollider
          args={[0.1, 0.9, 1.3]}
          position={[0, 1, 0]}
          sensor
          onIntersectionEnter={(e) => {
            const objectName = e.rigidBodyObject?.name;
            if (objectName === "ball") {
              increasePoints(team);
            }
          }}
        />
        <CuboidCollider args={[0.1, 1, 0.1]} position={[-0.3, 1.1, -1.5]} />
        <CuboidCollider args={[0.1, 0.1, 1.7]} position={[-0.3, 2.2, 0]} />
        <CuboidCollider args={[0.1, 1, 0.1]} position={[-0.3, 1.1, 1.5]} />

        <group dispose={null} scale={0.04}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part003.geometry}
            material={materials["mb:o:5926:1"]}
            position={[10.105, -0.063, -24]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part004.geometry}
            material={materials["mb:o:5926:1"]}
            position={[10.105, -0.063, 0]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part005.geometry}
            material={materials["mb:o:5926:1"]}
            position={[10.105, -0.063, 24]}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part038.geometry}
            material={materials["mb:o:176:1"]}
            position={[-5.895, 54.337, -28]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part039.geometry}
            material={materials["mb:o:176:1"]}
            position={[-5.895, 54.337, 28]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part066.geometry}
            material={materials["mb:o:63:1"]}
            position={[-5.895, 12.737, -40]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part067.geometry}
            material={materials["mb:o:63:1"]}
            position={[-5.895, 12.737, 40]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part160.geometry}
            material={materials["mb:o:4:1"]}
            position={[6.105, 12.737, -40]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part161.geometry}
            material={materials["mb:o:4:1"]}
            position={[6.105, 12.737, 40]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part330.geometry}
            material={materials["mb:o:371:1"]}
            position={[2.105, 3.137, -40]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part331.geometry}
            material={materials["mb:o:371:1"]}
            position={[2.105, 3.137, 40]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part337.geometry}
            material={materials["mb:o:2:1"]}
            position={[2.105, -0.063, 40]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part338.geometry}
            material={materials["mb:o:2:1"]}
            position={[-5.895, 51.137, -32]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part339.geometry}
            material={materials["mb:o:2:1"]}
            position={[-5.895, 51.137, 32]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part393.geometry}
            material={materials["mb:o:162:1"]}
            position={[-1.895, 22.337, -40]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part394.geometry}
            material={materials["mb:o:162:1"]}
            position={[-1.895, 22.337, 40]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part425.geometry}
            material={materials["mb:o:256:1"]}
            position={[-5.895, 54.337, 0]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part428.geometry}
            material={materials["mb:o:18602:1"]}
            position={[-5.895, 51.137, 0]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part336.geometry}
            material={materials["mb:o:2:1"]}
            position={[2.105, -0.063, -40]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload(MODEL);
