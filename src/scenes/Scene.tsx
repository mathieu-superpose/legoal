import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

import Lights from "../environment/Lights";
import Stadium from "../3d/Stadium";

import Players from "../3d/Players";
import Ball from "../3d/Ball";

export default function Scene() {
  return (
    <>
      <Lights />
      <Suspense fallback={null}>
        <Physics>
          <Stadium />
          <Players />
          <Ball />
        </Physics>
      </Suspense>
    </>
  );
}
