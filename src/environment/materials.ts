import * as THREE from "three";

export const materials = {
  yellow: new THREE.MeshStandardMaterial({ color: 0xffff00 }),
  red: new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  green: new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x0000ff }),
  white: new THREE.MeshStandardMaterial({ color: 0xffffff }),
  black: new THREE.MeshStandardMaterial({ color: 0x000000 }),
} as const;
