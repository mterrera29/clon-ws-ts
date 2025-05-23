import styles from './Header.module.css';
type HeaderProps = {
  caracter: string;
  img: string;
  handleBack: () => void;
};

export default function Header({ caracter, img, handleBack }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <section className={styles.headerItemsLeft}>
        <div onClick={() => handleBack()} className={styles.backIcon}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-arrow-left-short'
            viewBox='0 0 16 16'
          >
            <path
              fill-rule='evenodd'
              d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5'
            />
          </svg>
        </div>
        <div className={styles.containerProfile}>
          <img src={img} alt='' />
        </div>
        <div>
          <div className={styles.userName}>{caracter} </div>
        </div>
      </section>
      <section className={styles.headerItemsRight}>
        <div className={styles.headerIconsDots}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-three-dots-vertical'
            viewBox='0 0 16 16'
          >
            <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0' />
          </svg>
        </div>
      </section>
    </header>
  );
}
