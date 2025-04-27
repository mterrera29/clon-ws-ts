import { useEffect, useState } from 'react';
import styles from './ChatIndex.module.css';
import { Caracter, Message } from '../types';
import Chat from '../components/ChatIndex/Chat';
import Header from '../components/ChatIndex/Header';
import MessageInput from '../components/ChatIndex/MessageInput';
import { useAIStore } from '../store/store';
type ChatIndexProps = {
  caracterSelect: Caracter;
  handleSelect: (caracter: Caracter) => void;
};

function ChatIndex({ caracterSelect, handleSelect }: ChatIndexProps) {
  const date = Date.now();
  const [caracter] = useState(caracterSelect.caracter);
  const generateRecipe = useAIStore((state) => state.generateRecipe);
  const recipe = useAIStore((state) => state.recipe);
  const isGenerating = useAIStore((state) => state.isGenerating);
  const handleBack = () => {
    handleSelect({ caracter: '', img: '' });
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const users: string[] = [];

  const handleNewMessage = (message: Message) => {
    setMessages((prevState) => [...prevState, message]);
    setTimeout(() => {}, 100);
    generateRecipe(message.content, caracter);
  };

  useEffect(() => {
    if (recipe) {
      const msg: Message = {
        date: new Date(date),
        user: caracter,
        content: recipe,
      };
      setMessages((prevState) => [...prevState, msg]);
    }
  }, [recipe]);

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
      <Chat messages={messages} users={users} loading={isGenerating} />
      <MessageInput handleNewMessage={handleNewMessage} />
    </section>
  );
}

export default ChatIndex;
