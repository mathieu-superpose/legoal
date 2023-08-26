import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

import Lights from "../environment/Lights";
import Arena from "../3d/Arena";

export default function Scene() {
  return (
    <>
      <Lights />
      <Suspense fallback={null}>
        <Physics>
          {/* <Physics debug> */}
          <Arena />
        </Physics>
      </Suspense>
    </>
  );
}
