import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

import Lights from "../environment/Lights";
import Arena from "../3d/Arena";

import Players from "../3d/Players";
import Ball from "../3d/Ball";

export default function Scene() {
  return (
    <>
      <Lights />
      <Suspense fallback={null}>
        <Physics>
          <Arena />
          <Players />
          <Ball />
        </Physics>
      </Suspense>
    </>
  );
}
