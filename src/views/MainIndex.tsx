import style from './MainIndex.module.css';
import Header from '../components/MainIndex/Header';
import NavBar from '../components/MainIndex/NavBar';
import { useState } from 'react';
import ChatCaracter from '../components/MainIndex/ChatCaracter';
import { DATA } from '../data/data';
import { Caracter } from '../types';
import ChatIndex from './ChatIndex';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainIndex() {
  const [caracter] = useState(DATA);
  const [caracterSelect, setCaracterSelect] = useState<Caracter>({
    caracter: '',
    img: '',
  });
  console.log(caracterSelect);

  const handleSelect = (caracter: Caracter) => {
    setCaracterSelect(caracter);
  };

  return (
    <div className={style.container}>
      {caracterSelect.caracter === '' ? (
        <>
          <Header />
          <div className={style.chatsContainer}>
            <NavBar />
            {caracter.map((caracter) => (
              <ChatCaracter
                caracter={caracter}
                handleSelect={handleSelect}
                key={caracter.caracter}
              />
            ))}
          </div>
        </>
      ) : (
        <motion.div
          className={style.container}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeIn' }}
        >
          <ChatIndex
            caracterSelect={caracterSelect}
            handleSelect={handleSelect}
          />
        </motion.div>
      )}
    </div>
  );
}
