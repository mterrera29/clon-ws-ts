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
    id: 0,
    caracter: '',
    img: '',
  });

  const handleSelect = (caracter: Caracter) => {
    setCaracterSelect(caracter);
  };

  return (
    <div className={style.container}>
      <Header />
      <div className={style.chatsContainer}>
        <NavBar />
        {caracter.map((caracter) => (
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
              caracterSelect={caracterSelect}
              handleSelect={handleSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
