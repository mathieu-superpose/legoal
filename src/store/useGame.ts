import { create } from "zustand";

type State = {
  impulseX: number;
  impulseY: number;
  impulseZ: number;
};

type Action = {
  updateImpulseX: (x: State["impulseX"]) => void;
  updateImpulseY: (y: State["impulseY"]) => void;
  updateImpulseZ: (z: State["impulseZ"]) => void;
};

const useGame = create<State & Action>((set) => ({
  impulseX: 0,
  impulseY: 0,
  impulseZ: 0,
  updateImpulseX: (impulseX) => set(() => ({ impulseX })),
  updateImpulseY: (impulseY) => set(() => ({ impulseY })),
  updateImpulseZ: (impulseZ) => set(() => ({ impulseZ })),
}));

export default useGame;
