import { createRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BallCollider, RigidBody } from "@react-three/rapier";
import { getState, isHost, setState } from "playroomkit";

const SocketBall = forwardRef(({ position, rotation }, ref) => {
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
});

const LocalBall = forwardRef(({ position }, ref) => {
  return (
    <RigidBody
      ref={ref}
      name="ball"
      colliders={false}
      position={position}
      type="dynamic"
    >
      <BallCollider args={[0.4]} />
    </RigidBody>
  );
});

export default function Ball() {
  const modelRef = createRef();
  const bodyRef = createRef();

  const model = (
    <SocketBall ref={modelRef} position={[0, 1, 0]} rotation={[0, 0, 0]} />
  );
  const body = <LocalBall ref={bodyRef} position={[0, 1, 0]} />;

  useFrame(() => {
    let pos;
    let rot;

    /*
      // // HOST UPDATE
    */
    if (isHost()) {
      pos = bodyRef?.current?.translation();
      if (!pos) return;

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

    console.log("updatePosRot", pos, rot);
    // model position
    modelRef.current.position.x = pos.x;
    modelRef.current.position.y = pos.y;
    modelRef.current.position.z = pos.z;

    // model rotation
    modelRef.current.rotation.x = rot.x;
    modelRef.current.rotation.y = rot.y;
    modelRef.current.rotation.z = rot.z;
  });

  return (
    <group>
      {model}
      {isHost() ? body : null}
    </group>
  );
}
