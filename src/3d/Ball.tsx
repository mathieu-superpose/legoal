import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { getState, isHost, setState } from "playroomkit";

import useGame from "../store/useGame";

export default function Ball() {
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

    // model rotation
    modelRef.current.rotation.x = rot.x;
    modelRef.current.rotation.y = rot.y;
    modelRef.current.rotation.z = rot.z;
  });

  if (isHost())
    return (
      <group>
        <group ref={modelRef} position={[0, 3, 0]} rotation={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="red" />
          </mesh>
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
    <group>
      <group ref={modelRef} position={[0, 3, 0]} rotation={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </group>
  );
}
