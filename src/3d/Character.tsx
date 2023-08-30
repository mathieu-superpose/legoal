// @ts-nocheck

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

import { materials } from "../environment/materials";

type GLTFResult = GLTF & {
  nodes: {
    ArmLeft: THREE.SkinnedMesh;
    ArmLeftUp: THREE.SkinnedMesh;
    ArmRight: THREE.SkinnedMesh;
    ArmRightUp: THREE.SkinnedMesh;
    Ass: THREE.SkinnedMesh;
    Chest: THREE.SkinnedMesh;
    handLeft: THREE.SkinnedMesh;
    handLeft_1: THREE.SkinnedMesh;
    handRight: THREE.SkinnedMesh;
    handRight_1: THREE.SkinnedMesh;
    Head: THREE.SkinnedMesh;
    legRight: THREE.SkinnedMesh;
    legRight_1: THREE.SkinnedMesh;
    legRight002: THREE.SkinnedMesh;
    legRight002_1: THREE.SkinnedMesh;
    legRight001: THREE.SkinnedMesh;
    legRight001_1: THREE.SkinnedMesh;
    legLeft: THREE.SkinnedMesh;
    legLeft_1: THREE.SkinnedMesh;
    legLeft002: THREE.SkinnedMesh;
    legLeft002_1: THREE.SkinnedMesh;
    legLeft001: THREE.SkinnedMesh;
    legLeft001_1: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {};
  animations: GLTFAction[];
};

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

export type ActionName = "Idle" | "Run" | "Shoot" | "Walk";

export type TTeam = "red" | "blue" | "black";

const MODEL = "/3d/characters/legoman.glb";

export function Character({
  animation,
  team,
}: {
  animation: ActionName;
  team: TTeam;
}) {
  const characterRef = useRef(null);
  const { scene, animations } = useGLTF(MODEL) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, characterRef);

  useEffect(() => {
    const action = actions[animation];
    if (!action) return;

    action.reset().fadeIn(0.2).play();
    return () => action.fadeOut(0.2);
  }, [animation]);

  return (
    <group ref={characterRef} scale={0.5} dispose={null}>
      <group name="Armature" position={[0, -1.5, 0]}>
        <skinnedMesh
          name="ArmLeft"
          geometry={nodes.ArmLeft.geometry}
          material={materials.yellow}
          skeleton={nodes.ArmLeft.skeleton}
        />
        <skinnedMesh
          name="ArmLeftUp"
          geometry={nodes.ArmLeftUp.geometry}
          material={materials[team]}
          skeleton={nodes.ArmLeftUp.skeleton}
        />
        <skinnedMesh
          name="ArmRight"
          geometry={nodes.ArmRight.geometry}
          material={materials.yellow}
          skeleton={nodes.ArmRight.skeleton}
        />
        <skinnedMesh
          name="ArmRightUp"
          geometry={nodes.ArmRightUp.geometry}
          material={materials[team]}
          skeleton={nodes.ArmRightUp.skeleton}
        />
        <skinnedMesh
          name="Ass"
          geometry={nodes.Ass.geometry}
          material={materials.white}
          skeleton={nodes.Ass.skeleton}
        />
        <skinnedMesh
          name="Chest"
          geometry={nodes.Chest.geometry}
          material={materials[team]}
          skeleton={nodes.Chest.skeleton}
        />
        <group name="HandLeft">
          <skinnedMesh
            name="handLeft"
            geometry={nodes.handLeft.geometry}
            material={materials.yellow}
            skeleton={nodes.handLeft.skeleton}
          />
          <skinnedMesh
            name="handLeft_1"
            geometry={nodes.handLeft_1.geometry}
            material={materials.yellow}
            skeleton={nodes.handLeft_1.skeleton}
          />
        </group>
        <group name="HandRight">
          <skinnedMesh
            name="handRight"
            geometry={nodes.handRight.geometry}
            material={materials.yellow}
            skeleton={nodes.handRight.skeleton}
          />
          <skinnedMesh
            name="handRight_1"
            geometry={nodes.handRight_1.geometry}
            material={materials.yellow}
            skeleton={nodes.handRight_1.skeleton}
          />
        </group>
        <skinnedMesh
          name="Head"
          geometry={nodes.Head.geometry}
          material={materials.yellow}
          skeleton={nodes.Head.skeleton}
        />
        <group name="LegRight">
          <skinnedMesh
            name="legRight"
            geometry={nodes.legRight.geometry}
            material={materials.yellow}
            skeleton={nodes.legRight.skeleton}
          />
          <skinnedMesh
            name="legRight_1"
            geometry={nodes.legRight_1.geometry}
            material={materials.yellow}
            skeleton={nodes.legRight_1.skeleton}
          />
        </group>
        <group name="LegRightFoot">
          <skinnedMesh
            name="legRight002"
            geometry={nodes.legRight002.geometry}
            material={materials.black}
            skeleton={nodes.legRight002.skeleton}
          />
          <skinnedMesh
            name="legRight002_1"
            geometry={nodes.legRight002_1.geometry}
            material={materials.black}
            skeleton={nodes.legRight002_1.skeleton}
          />
        </group>
        <group name="LegRightUp">
          <skinnedMesh
            name="legRight001"
            geometry={nodes.legRight001.geometry}
            material={materials.white}
            skeleton={nodes.legRight001.skeleton}
          />
          <skinnedMesh
            name="legRight001_1"
            geometry={nodes.legRight001_1.geometry}
            material={materials.white}
            skeleton={nodes.legRight001_1.skeleton}
          />
        </group>
        <group name="LegsLeft">
          <skinnedMesh
            name="legLeft"
            geometry={nodes.legLeft.geometry}
            material={materials.yellow}
            skeleton={nodes.legLeft.skeleton}
          />
          <skinnedMesh
            name="legLeft_1"
            geometry={nodes.legLeft_1.geometry}
            material={materials.yellow}
            skeleton={nodes.legLeft_1.skeleton}
          />
        </group>
        <group name="LegsLeftFoot">
          <skinnedMesh
            name="legLeft002"
            geometry={nodes.legLeft002.geometry}
            material={materials.black}
            skeleton={nodes.legLeft002.skeleton}
          />
          <skinnedMesh
            name="legLeft002_1"
            geometry={nodes.legLeft002_1.geometry}
            material={materials.black}
            skeleton={nodes.legLeft002_1.skeleton}
          />
        </group>
        <group name="LegsLeftUp">
          <skinnedMesh
            name="legLeft001"
            geometry={nodes.legLeft001.geometry}
            material={materials.white}
            skeleton={nodes.legLeft001.skeleton}
          />
          <skinnedMesh
            name="legLeft001_1"
            geometry={nodes.legLeft001_1.geometry}
            material={materials.white}
            skeleton={nodes.legLeft001_1.skeleton}
          />
        </group>
        <primitive object={nodes.Root} />
      </group>
    </group>
  );
}

useGLTF.preload(MODEL);
