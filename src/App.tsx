import { useEffect } from 'react';
import { useAIStore } from './store/store';
import MainIndex from './views/MainIndex';

function App() {
  const loadFromStorage = useAIStore((state) => state.loadFromStorage);
  useEffect(() => {
    loadFromStorage();
  }, []);
  return <MainIndex />;
}

export default App;
