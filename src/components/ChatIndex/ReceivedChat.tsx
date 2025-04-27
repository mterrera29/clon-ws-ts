import { useEffect, useState } from 'react';
import { formatearHora, marginUser } from '../../helpers';
import './ReceivedChat.css';

type ReceivedChatProps = {
  date: Date;
  user: string;
  content: string;
  color: string;
  isPrevDay: boolean;
  prevMessageUser: string;
};

export default function ReceivedChat({
  content,
  date,
  user,
  color,
  isPrevDay,
  prevMessageUser,
}: ReceivedChatProps) {
  const userColor = color;
  const userYou = user === 'You';
  const differentUser = prevMessageUser !== user;
  const [isRead, setIsRead] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsRead(true);
    }, 2000);
  }, []);
  return (
    <section
      className={userYou ? 'bubleContainerSend' : 'bubleContainer'}
      style={marginUser(!differentUser, isPrevDay)}
    >
      {!userYou && (differentUser || !isPrevDay) ? (
        <div
          style={{
            fontWeight: 'bold',
            color: userColor,
          }}
        >
          {user}
        </div>
      ) : (
        <></>
      )}
      <div style={{ color: 'black' }}>{content}</div>
      <section className='messageInfo'>
        <div className='hour'>{formatearHora(date)}</div>
        <div className='checked'>
          <i
            className='bi bi-check2-all'
            style={isRead ? { color: '#53bdeb' } : { color: '#8696a0' }}
          ></i>
        </div>
      </section>
    </section>
  );
}
