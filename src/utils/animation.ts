import { RUN_SPEED } from "./constants";

export function getAnimation(linvel: { x: number; y: number; z: number }) {
  const velocity = Math.abs(linvel.x) + Math.abs(linvel.z);

  if (velocity > RUN_SPEED) return "Run";
  if (velocity > 0.1) return "Walk";
  return "Idle";
}
