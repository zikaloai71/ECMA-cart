import { create } from 'zustand';

const FIRST_STEP = 1;

type BuilderStepState = {
  openStep: number | null;
  goToStep: (stepNumber: number) => void;
  toggleStep: (stepNumber: number) => void;
};

export const useBuilderStepStore = create<BuilderStepState>()((set) => ({
  openStep: FIRST_STEP,
  goToStep: (stepNumber) => {
    set({ openStep: stepNumber });
  },
  toggleStep: (stepNumber) => {
    set((state) => ({
      openStep: state.openStep === stepNumber ? null : stepNumber,
    }));
  },
}));
