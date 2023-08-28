export function smoothAngle(curr: number, target: number, speed: number) {
  // Calculate the shortest angle between the target and the current rotation
  const angle = Math.atan2(Math.sin(target - curr), Math.cos(target - curr));
  // Calculate the amount of rotation to apply based on the speed and the angle
  const delta = speed * angle;
  // Apply the delta to the current rotation and return the new rotation
  return curr + delta;
}

export function radToXY(rad: number) {
  const x = Math.cos(rad);
  const y = Math.sin(rad);

  return { x: x, y: -y };
}
