import * as THREE from "three";

import Goal from "./Goal";
import Walls from "./Walls";
import Arena from "./Arena";
import Flags from "./Flags";

export default function Stadium() {
  return (
    <group>
      <Arena />
      <Goal
        position={new THREE.Vector3(11, 0.5, 0)}
        rotation={new THREE.Euler(0, 0, 0)}
      />
      <Goal
        position={new THREE.Vector3(-11, 0.5, 0)}
        rotation={new THREE.Euler(0, Math.PI, 0)}
      />
      <Walls />
      <Flags />
    </group>
  );
}
