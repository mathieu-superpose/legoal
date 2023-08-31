import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import logo from "./src/LEGOAL_LOGO.png";

export default function Logo() {
  const texture = useLoader(THREE.TextureLoader, logo);
  return (
    <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.57, 0]}>
      <planeGeometry attach="geometry" args={[6, 6]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}
