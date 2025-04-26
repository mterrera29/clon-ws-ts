import ReceivedChat from './ReceivedChat';
import { Message } from '../types';
import { getShuffledColors, formatDay } from '../helpers';
import { useEffect, useMemo, useRef } from 'react';
import './Chat.css';
import WritingSpinner from './WritingSpinner';

type ChatsProps = {
  messages: Message[];
  users: string[];
  loading: boolean;
};

export default function Chat({ messages, users, loading }: ChatsProps) {
  const dateNow = Date.now();
  const randomColorsArray = useMemo(() => getShuffledColors(), []);
  const prevDay: string[] = [];

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className='chatsContainer'>
      {hasMessages &&
        messages.map((message, index) => {
          const userIndex = users.findIndex((user) => user === message.user);
          const prevMessageUser = index > 0 ? messages[index - 1].user : '';

          const color = randomColorsArray[userIndex];
          const day =
            formatDay(message.date) === formatDay(new Date(dateNow))
              ? 'Today'
              : formatDay(message.date);
          const isPrevDay = prevDay.includes(day);
          prevDay.push(day);
          return (
            <section className='chatDays' key={index}>
              {!isPrevDay && (
                <div className='dateInfo'>
                  <div className='dateTextInfo'>{day}</div>
                </div>
              )}
              <ReceivedChat
                content={message.content}
                date={message.date}
                user={message.user}
                color={color}
                isPrevDay={isPrevDay}
                prevMessageUser={prevMessageUser}
              />
            </section>
          );
        })}
      <div style={{ marginTop: 'auto' }}>{loading && <WritingSpinner />}</div>
      <div ref={bottomRef} />
    </main>
  );
}
