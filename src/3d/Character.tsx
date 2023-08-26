// import * as THREE from "three";
// import React, { useRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";

import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

type GLTFResult = GLTF & {
  nodes: {
    ArmLeft: THREE.SkinnedMesh;
    ArmRight: THREE.SkinnedMesh;
    Ass: THREE.SkinnedMesh;
    Chest: THREE.SkinnedMesh;
    handLeft: THREE.SkinnedMesh;
    handLeft_1: THREE.SkinnedMesh;
    handRight: THREE.SkinnedMesh;
    handRight_1: THREE.SkinnedMesh;
    Head: THREE.SkinnedMesh;
    legRight: THREE.SkinnedMesh;
    legRight_1: THREE.SkinnedMesh;
    legLeft: THREE.SkinnedMesh;
    legLeft_1: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {};
  animations: GLTFAction[];
};

export type ActionName = "Idle" | "Run" | "Shoot" | "Walk";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

const MODEL = "/3d/characters/legoman.glb";

export function Character({ animation }: { animation: ActionName }) {
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
    <group ref={characterRef} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="ArmLeft"
            geometry={nodes.ArmLeft.geometry}
            material={nodes.ArmLeft.material}
            skeleton={nodes.ArmLeft.skeleton}
          />
          <skinnedMesh
            name="ArmRight"
            geometry={nodes.ArmRight.geometry}
            material={nodes.ArmRight.material}
            skeleton={nodes.ArmRight.skeleton}
          />
          <skinnedMesh
            name="Ass"
            geometry={nodes.Ass.geometry}
            material={nodes.Ass.material}
            skeleton={nodes.Ass.skeleton}
          />
          <skinnedMesh
            name="Chest"
            geometry={nodes.Chest.geometry}
            material={nodes.Chest.material}
            skeleton={nodes.Chest.skeleton}
          />
          <group name="HandLeft">
            <skinnedMesh
              name="handLeft"
              geometry={nodes.handLeft.geometry}
              material={nodes.handLeft.material}
              skeleton={nodes.handLeft.skeleton}
            />
            <skinnedMesh
              name="handLeft_1"
              geometry={nodes.handLeft_1.geometry}
              material={nodes.handLeft_1.material}
              skeleton={nodes.handLeft_1.skeleton}
            />
          </group>
          <group name="HandRight">
            <skinnedMesh
              name="handRight"
              geometry={nodes.handRight.geometry}
              material={nodes.handRight.material}
              skeleton={nodes.handRight.skeleton}
            />
            <skinnedMesh
              name="handRight_1"
              geometry={nodes.handRight_1.geometry}
              material={nodes.handRight_1.material}
              skeleton={nodes.handRight_1.skeleton}
            />
          </group>
          <skinnedMesh
            name="Head"
            geometry={nodes.Head.geometry}
            material={nodes.Head.material}
            skeleton={nodes.Head.skeleton}
          />
          <group name="LegRight">
            <skinnedMesh
              name="legRight"
              geometry={nodes.legRight.geometry}
              material={nodes.legRight.material}
              skeleton={nodes.legRight.skeleton}
            />
            <skinnedMesh
              name="legRight_1"
              geometry={nodes.legRight_1.geometry}
              material={nodes.legRight_1.material}
              skeleton={nodes.legRight_1.skeleton}
            />
          </group>
          <group name="LegsLeft">
            <skinnedMesh
              name="legLeft"
              geometry={nodes.legLeft.geometry}
              material={nodes.legLeft.material}
              skeleton={nodes.legLeft.skeleton}
            />
            <skinnedMesh
              name="legLeft_1"
              geometry={nodes.legLeft_1.geometry}
              material={nodes.legLeft_1.material}
              skeleton={nodes.legLeft_1.skeleton}
            />
          </group>
          <primitive object={nodes.Root} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL);
