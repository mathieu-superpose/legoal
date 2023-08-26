import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Arena() {
  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider
        args={[10, 1, 10]}
        position={[0, -0.5, 0]}
        friction={0.7}
        restitution={0.3}
      />
      <mesh>
        <boxGeometry args={[10, 1, 10]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
}
