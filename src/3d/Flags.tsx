import * as THREE from "three";

import Flag from "./Flag";

const redColor = new THREE.Color(0xff0000);
const blueColor = new THREE.Color(0x0000ff);

export default function Flags() {
  return (
    <group>
      <Flag
        position={new THREE.Vector3(-10, 1, 5)}
        rotation={new THREE.Euler(0, -Math.PI/2, 0)}
        color={redColor}
      />
      <Flag
        position={new THREE.Vector3(-10, 1, -5)}
        rotation={new THREE.Euler(0, Math.PI, 0)}
        color={redColor}
      />
      <Flag
        position={new THREE.Vector3(10, 1, 5)}
        rotation={new THREE.Euler(0, 0, 0)}
        color={blueColor}
      />
      <Flag
        position={new THREE.Vector3(10, 1, -5)}
        rotation={new THREE.Euler(0, Math.PI/2, 0)}
        color={blueColor}
      />
    </group>
  );
}
