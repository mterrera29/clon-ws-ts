import { useEffect, useState } from 'react';
import './App.css';
import { Message } from './types';
import Header from './components/Header';
import Chat from './components/Chat';
import MessageInput from './components/MessageInput';
import { useAIStore } from './store/store';

function App() {
  const date = Date.now();
  const [caracter, setCaracter] = useState('Poseidon');
  const generateRecipe = useAIStore((state) => state.generateRecipe);
  const recipe = useAIStore((state) => state.recipe);
  const isGenerating = useAIStore((state) => state.isGenerating);
  console.log(recipe);

  const [messages, setMessages] = useState<Message[]>([]);
  /* {
    date: new Date(date),
    content: `Hola! hablemos`,
    user: `${caracter}`,
  } */
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
    <section className='container'>
      <Header caracter={caracter} />
      <Chat messages={messages} users={users} loading={isGenerating} />
      <MessageInput handleNewMessage={handleNewMessage} />
    </section>
  );
}

export default App;
