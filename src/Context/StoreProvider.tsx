import { useEffect, useState } from 'react';
import { store } from './StoreContext';
import { FoodCardType, StorageType } from '../Utils/Types';
import { mockStorage } from '../Utils/Mock';
import { filterRecipes } from '../Utils/FilterRecipes';

type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [Food, setFood] = useState('');
  const [storage, setStorage] = useState({} as StorageType);
  const [storeRecipes, setStoreRecipes] = useState<StorageType>(mockStorage);

  useEffect(() => {
    const storageDoneRecipes:FoodCardType[] = JSON.parse(
      localStorage.getItem('doneRecipes') || '[]',
    );
    const storageFavRecipes:FoodCardType[] = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]',
    );
    setStorage(mockStorage);

    const favStorage = { ...mockStorage, favoriteRecipes: storageFavRecipes };
    const doneStorage = { ...mockStorage, doneRecipes: storageDoneRecipes };

    if (storageFavRecipes.length !== 0) setStorage(favStorage);
    if (storageDoneRecipes.length !== 0) setStorage(doneStorage);
  }, []);

  const HandleFood = (Page: string) => {
    setFood(Page);
  };

  const HandleDoneRecipes = (Filter : string) => {
    const newDoneRecipes = filterRecipes(Filter, storage.doneRecipes);
    const newStore = { ...storeRecipes, doneRecipes: newDoneRecipes };
    setStoreRecipes(newStore);
  };
  const HandleFavorites = (Filter : string) => {
    const newFavRecipes = filterRecipes(Filter, storage.favoriteRecipes);
    const newStore = { ...storeRecipes, favoriteRecipes: newFavRecipes };
    setStoreRecipes(newStore);
  };
  const RemoveFavorites = (Recipe : string) => {
    const newFavs = storage.favoriteRecipes.filter((Favs) => Favs.name !== Recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setStorage({ ...storage, favoriteRecipes: newFavs });
    setStoreRecipes({ ...storeRecipes, favoriteRecipes: newFavs });
  };

  return (
    <store.Provider
      value={
        { Food,
          HandleFood,
          HandleDoneRecipes,
          HandleFavorites,
          RemoveFavorites,
          storeRecipes }
       }
    >
      <div>
        {children}
      </div>
    </store.Provider>
  );
}

export default StoreProvider;
