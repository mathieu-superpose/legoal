import {
  createRef,
  forwardRef,
  Ref,
  Suspense,
  useEffect,
  useState,
} from "react";
import { myPlayer, isHost, onPlayerJoin, PlayerState } from "playroomkit";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

import {
  AREA_SIZE,
  MAX_SPEED,
  ROTATION_SPEED,
  SHOOT_TIME,
  VELOCITY,
} from "../utils/constants";
import { smoothAngle } from "../utils/angles";
import { getAnimation } from "../utils/animation";
import { randomStartPos } from "../utils/randomPosition";

import { ActionName, Character } from "./Character";

const SocketPlayer = forwardRef(
  (
    {
      position,
      rotation,
    }: {
      position: THREE.Vector3 | undefined;
      rotation: THREE.Euler | undefined;
    },
    ref: Ref<THREE.Group> | undefined
  ) => {
    const [currentAnimation, setCurrentAnimation] =
      useState<ActionName>("Idle");

    useFrame(() => {
      if (!ref) return;

      if (currentAnimation !== ref?.current?.name || "Idle") {
        setCurrentAnimation(ref?.current?.name || "Idle");
      }
    });

    return (
      <group ref={ref} position={position} rotation={rotation}>
        <Suspense fallback={null}>
          <Character animation={currentAnimation} />
        </Suspense>
      </group>
    );
  }
);

const LocalPlayer = forwardRef(
  (
    { position }: { position: THREE.Vector3 | undefined },
    ref: Ref<typeof RigidBody>
  ) => {
    return (
      <RigidBody
        ref={ref}
        enabledRotations={[false, false, false]}
        type="dynamic"
        colliders={false}
        position={position}
        linearDamping={0.7}
      >
        <CapsuleCollider args={[0.5, 0.3]} />
      </RigidBody>
    );
  }
);

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [characters, setCharacters] = useState([]);

  const up = useKeyboardControls((state) => state.up);
  const down = useKeyboardControls((state) => state.down);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const shoot = useKeyboardControls((state) => state.shoot);

  const direction = new THREE.Vector3();

  useEffect(() => {
    onPlayerJoin(async (state: PlayerState) => {
      const playerRef = createRef();
      const bodyRef = createRef();

      const startPos = randomStartPos(AREA_SIZE);

      const currCharacter = (
        <SocketPlayer
          key={state.id}
          ref={playerRef}
          position={startPos}
          rotation={new THREE.Euler(0, 0, 0)}
        />
      );

      if (isHost()) {
        const currBody = (
          <LocalPlayer key={state.id} ref={bodyRef} position={startPos} />
        );
        setBodies((bodies) => [...bodies, currBody]);
      }

      setPlayers((players) => [...players, { state, playerRef, bodyRef }]);
      setCharacters((characters) => [...characters, currCharacter]);

      state.onQuit(() => {
        setCharacters((characters) =>
          characters.filter((p) => p.state.id !== currCharacter.id)
        );
      });
    });
  }, []);

  useFrame((state, delta) => {
    // keyboard controls
    direction.x = Number(right) - Number(left);
    direction.z = Number(down) - Number(up);
    direction.normalize();

    // update shared direction inputs
    myPlayer().setState("dir", direction);

    // shoot
    const elapsedTime = state.clock.getElapsedTime();
    const lastShot = myPlayer().getState("lastShot") || 0;
    const isShooting = myPlayer().getState("shoot") || false;

    if (shoot && elapsedTime - lastShot > SHOOT_TIME) {
      myPlayer().setState("lastShot", elapsedTime);
      myPlayer().setState("shoot", true);
    }

    if (elapsedTime - lastShot > SHOOT_TIME && isShooting) {
      myPlayer().setState("shoot", false);
    }

    for (const player of players) {
      const state = player.state;

      // update collider position if is host
      if (isHost()) {
        const { bodyRef } = player;
        if (!bodyRef?.current) continue;

        const dir = state.getState("dir");
        if (!dir) continue;

        //move rigidbody
        const impulse = {
          x: dir.x * VELOCITY * delta,
          y: 0,
          z: dir.z * VELOCITY * delta,
        };

        const linvel = bodyRef.current.linvel();

        if (Math.abs(linvel.x) >= MAX_SPEED) impulse.x = 0;
        if (Math.abs(linvel.z) >= MAX_SPEED) impulse.z = 0;

        bodyRef.current.applyImpulse(impulse, true);

        // update shared position
        const pos = bodyRef.current.translation();
        state.setState("pos", pos);

        // update character
        const playerRef = player.playerRef;
        if (!playerRef?.current) continue;

        // move the player
        const playerPos = playerRef.current.position;

        if (playerPos.x !== pos.x) playerPos.x = pos.x;
        if (playerPos.y !== pos.y) playerPos.y = pos.y;
        if (playerPos.z !== pos.z) playerPos.z = pos.z;

        // update animation

        const isShooting = state.getState("shoot") || false;
        const animation = isShooting ? "Shoot" : getAnimation(linvel);

        if (playerRef.current?.name !== animation) {
          playerRef.current.name = animation;
          state.setState("anim", animation);
        }

        // rotate the player
        if (dir.x || dir.z) {
          const angle = Math.atan2(dir.x, dir.z);

          // smooth rotation
          const smoothedAngle = smoothAngle(
            playerRef.current.rotation.y,
            angle,
            delta * ROTATION_SPEED
          );

          playerRef.current.rotation.y = smoothedAngle;

          // update shared rotation
          state.setState("rot", angle);
        }
      } else {
        // update character
        const { playerRef } = player;
        if (!playerRef?.current) continue;

        // retrieve shared position
        const pos = state.getState("pos");
        if (!pos) continue;

        const { position } = playerRef.current;

        if (position.x !== pos.x) position.x = pos.x;
        if (position.y !== pos.y) position.y = pos.y;
        if (position.z !== pos.z) position.z = pos.z;

        const dir = state.getState("dir");

        const angle = Math.atan2(dir.x, dir.z);

        // smooth rotation
        const smoothedAngle = smoothAngle(
          playerRef.current.rotation.y,
          angle,
          delta * ROTATION_SPEED
        );

        playerRef.current.rotation.y = smoothedAngle;

        // retrieve shared animation
        const animation = state.getState("anim");
        if (!animation) continue;
        if (playerRef.current?.name !== animation) {
          playerRef.current.name = animation;
        }
      }
    }
  });

  return (
    <group>
      {characters}
      {isHost() ? bodies : null}
    </group>
  );
}
