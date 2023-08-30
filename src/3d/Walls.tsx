import * as THREE from "three";

import Wall from "./Wall";
import { useMemo } from "react";

export default function Walls() {
  const backWalls = useMemo(() => {
    const walls = [];

    for (let i = 1; i < 7; i++) {
      const key = "wall_" + ("00" + i).slice(-3);
      const w = {
        key,
        p: { x: -12.3 + 3.5 * i, y: 0, z: -6 },
        r: { x: 0, y: 0, z: 0 },
      };
      walls.push(w);
    }

    return walls;
  }, []);

  const frontWalls = useMemo(() => {
    const walls = [];

    for (let i = 1; i < 7; i++) {
      const key = "wall_" + ("00" + (i + 6)).slice(-3);
      const w = {
        key,
        p: { x: -12.3 + 3.5 * i, y: 0, z: 6 },
        r: { x: 0, y: Math.PI, z: 0 },
      };
      walls.push(w);
    }

    return walls;
  }, []);

  const leftWalls = useMemo(() => {
    const walls = [];

    for (let i = 1; i < 4; i++) {
      if (i === 2) continue;
      const key = "wall_" + ("00" + (i + 12)).slice(-3);
      const w = {
        key,
        p: { x: -11, y: 0, z: -8 + 4 * i },
        r: { x: 0, y: Math.PI / 2, z: 0 },
      };
      walls.push(w);
    }

    return walls;
  }, []);

  const rightWalls = useMemo(() => {
    const walls = [];

    for (let i = 1; i < 4; i++) {
      if (i === 2) continue;
      const key = "wall_" + ("00" + (i + 14)).slice(-3);
      const w = {
        key,
        p: { x: 11, y: 0, z: -8 + 4 * i },
        r: { x: 0, y: -Math.PI / 2, z: 0 },
      };
      walls.push(w);
    }

    return walls;
  }, []);

  return (
    <group>
      {backWalls
        ? backWalls.map((w) => (
            <Wall
              key={w.key}
              position={new THREE.Vector3(w.p.x, w.p.y, w.p.z)}
              rotation={new THREE.Euler(w.r.x, w.r.y, w.r.z)}
            />
          ))
        : null}
      {frontWalls
        ? frontWalls.map((w) => (
            <Wall
              key={w.key}
              position={new THREE.Vector3(w.p.x, w.p.y, w.p.z)}
              rotation={new THREE.Euler(w.r.x, w.r.y, w.r.z)}
            />
          ))
        : null}
      {leftWalls
        ? leftWalls.map((w) => (
            <Wall
              key={w.key}
              position={new THREE.Vector3(w.p.x, w.p.y, w.p.z)}
              rotation={new THREE.Euler(w.r.x, w.r.y, w.r.z)}
            />
          ))
        : null}
      {rightWalls
        ? rightWalls.map((w) => (
            <Wall
              key={w.key}
              position={new THREE.Vector3(w.p.x, w.p.y, w.p.z)}
              rotation={new THREE.Euler(w.r.x, w.r.y, w.r.z)}
            />
          ))
        : null}
    </group>
  );
}
