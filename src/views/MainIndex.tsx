import style from './MainIndex.module.css';
import Header from '../components/MainIndex/Header';
import NavBar from '../components/MainIndex/NavBar';
import { useEffect, useState } from 'react';
import ChatCaracter from '../components/MainIndex/ChatCaracter';
import { DATA } from '../data/data';
import { Caracter } from '../types';
import ChatIndex from './ChatIndex';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainIndex() {
  //CARACTER NO QUEDA GUARDADO EN LOCAL STORAGE POR ESO CAMBIA SIN SINCRONIZARSE CON ESO
  const localCaracter = JSON.parse(localStorage.getItem('caracter'));
  const [caracter, setCaracter] = useState<Caracter[]>(localCaracter || DATA);
  const [caracterSelect, setCaracterSelect] = useState<Caracter>({
    id: 0,
    caracter: '',
    img: '',
    date: undefined,
  });
  const [sortedCaracter, setSortedCaracter] = useState<Caracter[]>([]);

  const handleSelect = (caracter: Caracter) => {
    setCaracterSelect(caracter);
  };

  useEffect(() => {
    const caracterDate = caracter.map((item) => ({
      ...item,
      date: item.date ? new Date(item.date) : null,
    }));

    const sortedDateCaracter = [...caracterDate].sort((a, b) => {
      const timeA = a.date?.getTime() ?? -Infinity;
      const timeB = b.date?.getTime() ?? -Infinity;
      return timeB - timeA;
    });

    setSortedCaracter(sortedDateCaracter);
    localStorage.setItem('caracter', JSON.stringify(caracter));
  }, [caracter]);

  console.log(sortedCaracter);

  return (
    <div className={style.container}>
      <Header />
      <div className={style.chatsContainer}>
        <NavBar />
        {sortedCaracter.map((caracter) => (
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
