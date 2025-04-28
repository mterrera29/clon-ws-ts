import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AISliceType, createAISlice } from './aiSlice';
import { MessagesSliceType } from './messageSlice';

export const useAIStore = create<AISliceType & MessagesSliceType>()(
  devtools((...a) => ({
    ...createAISlice(...a),
  }))
);
