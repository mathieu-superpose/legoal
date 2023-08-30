import * as THREE from "three";

export const randomStartPos = (areaSize: number) => {
  const x = randomIntBewteen(-areaSize, areaSize);
  const y = 0.5;
  const z = randomIntBewteen(-areaSize, areaSize);

  return new THREE.Vector3(x, y, z);
};

const randomIntBewteen = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};
