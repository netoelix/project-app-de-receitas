import { useState } from 'react';
import { store } from './StoreContext';

type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [Food, setFood] = useState('');

  const HandleFood = (Page: string) => {
    setFood(Page);
  };

  return (
    <store.Provider value={ { Food, HandleFood } }>
      <div>
        {children}
      </div>
    </store.Provider>
  );
}

export default StoreProvider;
