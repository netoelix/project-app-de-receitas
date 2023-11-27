import { useEffect, useState } from 'react';
import { store } from './StoreContext';
import { filterRecipes } from '../Utils/FilterRecipes';
import { FoodCardType } from '../Utils/Types';
import { MockDoneRecipes2 } from '../Utils/Mock';

type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [Food, setFood] = useState('');
  const [doneRecipes, setDoneRecipes] = useState<FoodCardType[]>([]);
  const [storage, setStorage] = useState<FoodCardType[]>([]);

  useEffect(() => {
    const storageDoneRecipes:FoodCardType[] = JSON.parse(
      localStorage.getItem('doneRecipes') || '[]',
    );
    if (storageDoneRecipes.length !== 0) {
      setStorage(storageDoneRecipes);
      setDoneRecipes(storageDoneRecipes);
    } else {
      setStorage(MockDoneRecipes2);
      setDoneRecipes(MockDoneRecipes2);
    }
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
