import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  RigidBody,
  RapierRigidBody,
  quat,
  euler,
} from "@react-three/rapier";
import { getState, isHost, setState } from "playroomkit";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import useGame from "../store/useGame";

type GLTFResult = GLTF & {
  nodes: {
    Icosphere_1: THREE.Mesh;
    Icosphere_2: THREE.Mesh;
  };
  materials: {
    white: THREE.MeshStandardMaterial;
    black: THREE.MeshStandardMaterial;
  };
};

const MODEL = "3d/football.glb";

export default function Ball() {
  const { nodes, materials } = useGLTF(MODEL) as GLTFResult;
  const modelRef = useRef(null);
  const bodyRef = useRef<RapierRigidBody>(null);

  const impulseX = useGame((state) => state.impulseX);
  const impulseY = useGame((state) => state.impulseY);
  const impulseZ = useGame((state) => state.impulseZ);
  const updateImpulseX = useGame((state) => state.updateImpulseX);
  const updateImpulseY = useGame((state) => state.updateImpulseY);
  const updateImpulseZ = useGame((state) => state.updateImpulseZ);

  useFrame(() => {
    let pos;
    let rot;

    /*
      // // HOST UPDATE
    */
    if (isHost()) {
      pos = bodyRef?.current?.translation();
      if (!pos) return;

      // replace ball
      if (pos.y < -2) {
        bodyRef.current.setTranslation({ x: 0, y: 2, z: 0 }, true);
        bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }

      if (impulseX !== 0 || impulseY !== 0 || impulseZ !== 0) {
        const impulse = {
          x: impulseX || 0,
          y: impulseY || 0,
          z: impulseZ || 0,
        };

        if (!bodyRef?.current) return;
        bodyRef?.current?.applyImpulse(impulse, true);

        updateImpulseX(0);
        updateImpulseY(0);
        updateImpulseZ(0);
      }

      rot = bodyRef?.current?.rotation();
      console.log(rot);
      if (!rot) return;

      setState("ball", { bombPos: pos, bombRot: rot }, false);
    }

    /*
      // // CLIENT UPDATE
    */
    if (!isHost()) {
      const updatedState = getState("ball");

      if (!updatedState) return;

      pos = updatedState.bombPos;
      rot = updatedState.bombRot;
    }

    // model position
    modelRef.current.position.x = pos.x;
    modelRef.current.position.y = pos.y;
    modelRef.current.position.z = pos.z;

    const eulerRot = euler().setFromQuaternion(quat(rot));

    // model rotation
    modelRef.current.rotation.x = eulerRot.x;
    modelRef.current.rotation.y = eulerRot.y;
    modelRef.current.rotation.z = eulerRot.z;
  });

  if (isHost())
    return (
      <group>
        <group ref={modelRef} position={[0, 3, 0]}>
          <group dispose={null} scale={0.4}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Icosphere_1.geometry}
              material={materials.white}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Icosphere_2.geometry}
              material={materials.black}
            />
          </group>
        </group>

        <RigidBody
          ref={bodyRef}
          name="ball"
          colliders={false}
          position={[0, 3, 0]}
          type="dynamic"
        >
          <BallCollider args={[0.4]} />
        </RigidBody>
      </group>
    );

  return (
    <group ref={modelRef}>
      <group dispose={null} scale={0.4}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere_1.geometry}
          material={materials.white}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Icosphere_2.geometry}
          material={materials.black}
        />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL);
