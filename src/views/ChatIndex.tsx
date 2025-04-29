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
};

function ChatIndex({ caracterSelect, handleSelect }: ChatIndexProps) {
  const [caracter] = useState(caracterSelect.caracter);
  const generateRecipe = useAIStore((state) => state.generateRecipe);
  const isGenerating = useAIStore((state) => state.isGenerating);
  const handleBack = () => {
    handleSelect({ id: 0, caracter: '', img: '' });
  };

  console.log(caracterSelect);

  const messages = useAIStore((state) => state.messages);
  const createMessages = useAIStore((state) => state.createMessages);
  const users: string[] = [];
  const messagesFilter = messages.filter((msg) => msg.id === caracterSelect.id);
  console.log(messages);

  function ordenarArray(
    array: { id: number; date?: Date; user: string; content: string }[]
  ) {
    const conDate = array
      .filter((item) => item.date)
      .sort((a, b) => b.date!.getTime() - a.date!.getTime());
    const sinDate = array
      .filter((item) => !item.date)
      .sort((a, b) => b.id - a.id);
    const resultado = Array.from(
      new Set([...conDate, ...sinDate].map((item) => item.id))
    );

    return resultado;
  }
  console.log(ordenarArray(messages));

  const handleNewMessage = (message: Omit<Message, 'id'>) => {
    const msg: Message = {
      id: caracterSelect.id,
      date: message.date,
      user: message.user,
      content: message.content,
    };
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
