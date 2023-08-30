import { create } from "zustand";

type State = {
  impulseX: number;
  impulseY: number;
  impulseZ: number;
  red: number;
  blue: number;
};

type Action = {
  updateImpulseX: (x: State["impulseX"]) => void;
  updateImpulseY: (y: State["impulseY"]) => void;
  updateImpulseZ: (z: State["impulseZ"]) => void;
  increasePoints: (key: "red" | "blue") => void;
};

const useGame = create<State & Action>((set) => ({
  impulseX: 0,
  impulseY: 0,
  impulseZ: 0,
  updateImpulseX: (impulseX) => set(() => ({ impulseX })),
  updateImpulseY: (impulseY) => set(() => ({ impulseY })),
  updateImpulseZ: (impulseZ) => set(() => ({ impulseZ })),
  red: 0,
  blue: 0,
  increasePoints: (key) => set((state) => ({ [key]: state[key] + 1 })),
}));

export default useGame;
