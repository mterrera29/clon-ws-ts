import { useState } from 'react';
import styles from './ChatIndex.module.css';
import { Caracter, Message } from '../types';
import Chat from '../components/ChatIndex/Chat';
import Header from '../components/ChatIndex/Header';
import MessageInput from '../components/ChatIndex/MessageInput';
import { useAIStore } from '../store/store';
type ChatIndexProps = {
  caracterSelect: Caracter;
  handleSelect: (caracter: Caracter) => void;
  setCaracter: React.Dispatch<React.SetStateAction<Caracter[]>>;
};

function ChatIndex({
  caracterSelect,
  handleSelect,
  setCaracter,
}: ChatIndexProps) {
  const [caracter] = useState(caracterSelect.caracter);
  const generateRecipe = useAIStore((state) => state.generateRecipe);
  const isGenerating = useAIStore((state) => state.isGenerating);
  const handleBack = () => {
    handleSelect({ id: 0, caracter: '', img: '', date: undefined });
  };

  const messages = useAIStore((state) => state.messages);
  const createMessages = useAIStore((state) => state.createMessages);
  const users: string[] = [];
  const messagesFilter = messages.filter((msg) => msg.id === caracterSelect.id);

  const handleNewMessage = (message: Omit<Message, 'id'>) => {
    const msg: Message = {
      id: caracterSelect.id,
      date: message.date,
      user: message.user,
      content: message.content,
    };
    setCaracter((prev) => {
      return prev.map((obj) =>
        obj.id === caracterSelect.id ? { ...obj, date: message.date } : obj
      );
    });
    createMessages(msg);
    setTimeout(() => {}, 100);
    generateRecipe(message.content, caracterSelect);
  };

  messages.map((messages) => {
    const isUser = users.includes(messages.user);
    if (isUser) {
      return;
    } else if (messages.user === 'You') {
      return;
    } else {
      users.push(messages.user);
    }
  });

  return (
    <section className={styles.container}>
      <Header
        caracter={caracter}
        img={caracterSelect.img}
        handleBack={handleBack}
      />
      <Chat messages={messagesFilter} users={users} loading={isGenerating} />
      <MessageInput handleNewMessage={handleNewMessage} />
    </section>
  );
}

export default ChatIndex;
