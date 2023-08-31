import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import logo from "./src/goal_zone.png";

export default function Zone() {
  const texture = useLoader(THREE.TextureLoader, logo);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.575, 0]}
      material={material}
    >
      <planeGeometry attach="geometry" args={[22, 12]} />
    </mesh>
  );
}
