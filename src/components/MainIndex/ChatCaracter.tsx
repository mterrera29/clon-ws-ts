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
      </section>
    </section>
  );
}
