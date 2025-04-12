import { useEffect, useState } from 'react';
import './App.css';
import GenerateData from './data';
import { Message } from './types';
import Header from './components/Header';
import Chat from './components/Chat';
import MessageInput from './components/MessageInput';
import useAIResponse from './hooks/useAIResponse';

function App() {
  const date = Date.now();
  const { loading, AiResponse, fetchData } = useAIResponse();
  const [caracter, setCaracter] = useState('Manuel Belgrano');
  const [messages, setMessages] = useState([
    {
      date: new Date(date),
      content: `Hola! soy ${caracter}, podés preguntarme lo que quieras`,
      user: `${caracter}`,
    },
  ]);
  const users: string[] = [];
  console.log(GenerateData().messages);

  const handleNewMessage = (message: Message) => {
    setMessages((prevState) => [...prevState, message]);
    setTimeout(() => {}, 100);
    fetchData(message.content, caracter);
  };

  useEffect(() => {
    if (AiResponse) {
      const msg: Message = {
        date: new Date(date),
        user: caracter,
        content: AiResponse,
      };
      setMessages((prevState) => [...prevState, msg]);
    }
  }, [AiResponse]);

  console.log(AiResponse);

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
      <Chat messages={messages} users={users} loading={loading} />
      <MessageInput handleNewMessage={handleNewMessage} />
    </section>
  );
}

export default App;
