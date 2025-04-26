import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import AIservices from '../services/AIservices';

export type AIStoreType = {
  recipe: string;
  isGenerating: boolean;
  generateRecipe: (prompt: string, caracter: string) => Promise<void>;
};

export const useAIStore = create<AIStoreType>()(
  devtools((set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt, caracter) => {
      set({
        isGenerating: true,
        recipe: '',
      });
      const data = await AIservices.generateRecipe(prompt, caracter);
      console.log(data);
      set((state) => ({
        recipe: state.recipe + data,
      }));
      set({
        isGenerating: false,
      });
    },
  }))
);
