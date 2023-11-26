import { useEffect, useState } from 'react';
import { store } from './StoreContext';
import { filterRecipes } from '../Utils/FilterRecipes';
import { FoodCardType } from '../Utils/Types';

type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [Food, setFood] = useState('');
  const [doneRecipes, setDoneRecipes] = useState<FoodCardType[]>([]);
  const [storage, setStorage] = useState<FoodCardType[]>([]);

  useEffect(() => {
    const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    if (storageDoneRecipes) setStorage(storageDoneRecipes);
    if (storageDoneRecipes) setDoneRecipes(storageDoneRecipes);
  }, []);

  const HandleFood = (Page: string) => {
    setFood(Page);
  };
  const HandleDoneRecipes = (Filter : string) => {
    const newDoneRecipes = filterRecipes(Filter, storage);
    setDoneRecipes(newDoneRecipes);
  };

  return (
    <store.Provider value={ { Food, HandleFood, doneRecipes, HandleDoneRecipes } }>
      <div>
        {children}
      </div>
    </store.Provider>
  );
}

export default StoreProvider;
