import { RigidBody } from "@react-three/rapier";

export default function Arena() {
  return (
    <RigidBody type="fixed" colliders={"cuboid"}>
      <mesh>
        <boxGeometry args={[22, 1, 12]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
}
