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
  const [caracter, setCaracter] = useState<Caracter[]>(DATA);
  const [caracterSelect, setCaracterSelect] = useState<Caracter>({
    id: 0,
    caracter: '',
    img: '',
    date: undefined,
  });

  const handleSelect = (caracter: Caracter) => {
    setCaracterSelect(caracter);
  };

  const sortedDateCaracter = [...caracter].sort((a, b) => {
    const timeA = a.date?.getTime() ?? -Infinity;
    const timeB = b.date?.getTime() ?? -Infinity;
    return timeB - timeA;
  });

  return (
    <div className={style.container}>
      <Header />
      <div className={style.chatsContainer}>
        <NavBar />
        {sortedDateCaracter.map((caracter) => (
          <ChatCaracter
            caracter={caracter}
            handleSelect={handleSelect}
            key={caracter.id}
          />
        ))}
      </div>
      <AnimatePresence>
        {caracterSelect.caracter !== '' && (
          <motion.div
            className={style.chatOverlay}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <ChatIndex
              setCaracter={setCaracter}
              caracterSelect={caracterSelect}
              handleSelect={handleSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
