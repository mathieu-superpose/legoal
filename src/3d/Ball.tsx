import { RigidBody } from "@react-three/rapier";

export default function Ball() {
  return (
    <RigidBody 
    type="dynamic" 
    colliders={"ball"}
    position={[0, 1, 0]}
    >
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
}
