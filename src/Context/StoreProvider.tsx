import { useEffect, useState } from 'react';
import { store } from './StoreContext';
import { filterRecipes } from '../Utils/FilterRecipes';
import { FoodCardType } from '../Utils/Types';
import { MockDoneRecipes2, MockfavoriteRecipes } from '../Utils/Mock';

type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [Food, setFood] = useState('');
  const [storage, setStorage] = useState<FoodCardType[]>([]);
  const [doneRecipes, setDoneRecipes] = useState<FoodCardType[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FoodCardType[]>(
    MockfavoriteRecipes,
  );

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
  const HandleFavorites = (Filter : string) => {
    const newFavoriteRecipes = filterRecipes(Filter, storage);
    setFavoriteRecipes(newFavoriteRecipes);
  };

  return (
    <store.Provider
      value={
        { Food,
          HandleFood,
          doneRecipes,
          HandleDoneRecipes,
          favoriteRecipes,
          HandleFavorites }
       }
    >
      <div>
        {children}
      </div>
    </store.Provider>
  );
}

export default StoreProvider;
