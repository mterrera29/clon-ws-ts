import { StateCreator } from 'zustand';
import { Message } from '../types';

export type MessagesSliceType = {
  messages: Message[];
  createMessages: (messages: Message) => void;
};

export const createMessagesSlice: StateCreator<MessagesSliceType> = (set) => ({
  messages: [],
  createMessages: (messages) => {
    set((state) => ({
      messages: [...state.messages, messages],
    }));
  },
});
