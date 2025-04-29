import { formatDay, formatearHora } from '../../helpers';
import { useAIStore } from '../../store/store';
import { Caracter } from '../../types';
import styles from './ChatCaracter.module.css';

type ChatCaracterProps = {
  caracter: Caracter;
  handleSelect: (caracter: Caracter) => void;
};

export default function ChatCaracter({
  caracter,
  handleSelect,
}: ChatCaracterProps) {
  const messages = useAIStore((state) => state.messages);
  const messagesFilter = messages.filter((msg) => msg.id === caracter.id);
  const dateNow = Date.now();
  const lastMessage = messagesFilter[messagesFilter.length - 1];
  console.log(lastMessage);
  const day = lastMessage
    ? formatDay(lastMessage.date) === formatDay(new Date(dateNow))
      ? formatearHora(lastMessage.date)
      : formatDay(lastMessage.date)
    : '';

  return (
    <section
      className={styles.headerContainer}
      onClick={() => handleSelect(caracter)}
    >
      <section className={styles.headerItemsLeft}>
        <img className={styles.containerProfile} src={caracter.img} alt='' />
      </section>
      <section className={styles.headerItemsRight}>
        <p className={styles.userName}>{caracter.caracter} </p>
        <p className={styles.lastChat}>
          {lastMessage ? lastMessage.content.slice(0, 25) + '...' : ''}
        </p>
      </section>
      <p className={styles.hour}> {day}</p>
    </section>
  );
}
