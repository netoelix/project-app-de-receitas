import { useEffect, useState } from 'react';
import { FoodCardType, StorageType, StoreProviderProps } from '../Utils/Types';
import { mockStorage } from '../Utils/Mock';
import { filterRecipes } from '../Utils/FilterRecipes';
import StoreContext from './StoreContext';

function StoreProvider({ children } : StoreProviderProps) {
  const [food, setFood] = useState('');
  const [storage, setStorage] = useState({} as StorageType);
  const [storeRecipes, setStoreRecipes] = useState<StorageType>(mockStorage);
  const [recipesScreen, setRecipesScreen] = useState<FoodCardType[]>([]);
  const [recipes, setRecipes] = useState([] as FoodCardType[]);

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

  const handleFood = (page: string) => {
    setFood(page);
  };
  const handleDoneRecipes = (filter : string) => {
    const newDoneRecipes = filterRecipes(filter, storage.doneRecipes);
    const newStore = { ...storeRecipes, doneRecipes: newDoneRecipes };
    setStoreRecipes(newStore);
  };
  const handleFavorites = (filter : string) => {
    const newFavRecipes = filterRecipes(filter, storage.favoriteRecipes);
    const newStore = { ...storeRecipes, favoriteRecipes: newFavRecipes };
    setStoreRecipes(newStore);
  };
  const removeFavorites = (recipe : string) => {
    const newFavs = storage.favoriteRecipes.filter((favs) => favs.name !== recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setStorage({ ...storage, favoriteRecipes: newFavs });
    setStoreRecipes({ ...storeRecipes, favoriteRecipes: newFavs });
  };

  const handleScreen = (filter : string, List: FoodCardType[]) => {
    console.log(filter, List);
    setRecipesScreen(List);
  };

  const handleRecipes = (newRecipes: FoodCardType[]) => {
    setRecipes(newRecipes);
  };

  return (
    <StoreContext.Provider
      value={ {
        recipesScreen,
        food,
        handleFood,
        handleDoneRecipes,
        handleFavorites,
        handleScreen,
        removeFavorites,
        storeRecipes,
        recipes,
        handleRecipes,
      } }
    >
      <div>
        {children}
      </div>
    </StoreContext.Provider>
  );
}

export default StoreProvider;
