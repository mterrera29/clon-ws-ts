import { StateCreator } from 'zustand';
import AIservices from '../services/AIservices';
import { Caracter, Message } from '../types';

export type AISliceType = {
  recipe: string;
  isGenerating: boolean;
  generateRecipe: (prompt: string, caracter: Caracter) => Promise<void>;
  messages: Message[];
  createMessages: (messages: Message) => void;
};

export const createAISlice: StateCreator<AISliceType> = (set) => ({
  recipe: '',
  messages: [],
  isGenerating: false,
  generateRecipe: async (prompt, caracter) => {
    set({
      isGenerating: true,
      recipe: '',
    });
    const data = await AIservices.generateRecipe(prompt, caracter);
    const date = Date.now();
    const msg: Message = {
      id: caracter.id,
      date: new Date(date),
      user: caracter.caracter,
      content: data,
    };
    set((state) => ({
      recipe: state.recipe + data,
    }));
    set((state) => ({
      messages: [...state.messages, msg],
    }));
    set({
      isGenerating: false,
    });
  },
  createMessages: (messages) => {
    set((state) => ({
      messages: [...state.messages, messages],
    }));
  },
});
