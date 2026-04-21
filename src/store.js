import { create } from 'zustand';

export const useStore = create((set) => ({
  activeModel: 'trex', // Default to T-Rex
  activeAnimation: null,
  
  setActiveModel: (modelName) => set({ 
    activeModel: modelName, 
    activeAnimation: null // Reset animation when swapping models
  }),
  
  setActiveAnimation: (animName) => set({ activeAnimation: animName }),
}));