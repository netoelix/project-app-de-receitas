import { useEffect, useState } from 'react';
import { FoodCardType, StorageType } from '../Utils/Types';
import { filterRecipes } from '../Utils/FilterRecipes';
import StoreContext from './StoreContext';

export type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [storeRecipes, setStoreRecipes] = useState<StorageType>({} as StorageType);

  const [recipes, setRecipes] = useState([] as FoodCardType[]);

  const [showByDoneFilter, setShowByDoneFilter] = useState(false);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([] as FoodCardType[]);

  const [showByFavFilter, setShowByFavFilter] = useState(false);
  const [filteredFavRecipes, setFilteredFavRecipes] = useState([] as FoodCardType[]);

  useEffect(() => {
    const storageDoneRecipes:FoodCardType[] = JSON.parse(
      localStorage.getItem('doneRecipes') || JSON.stringify([]),
    );
    const storageFavRecipes:FoodCardType[] = JSON.parse(
      localStorage.getItem('favoriteRecipes') || JSON.stringify([]),
    );
    const storageUser = JSON.parse(
      localStorage.getItem('user') || JSON.stringify({
        email: '',
      }),
    );
    const storageInProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes') || JSON.stringify({
        drinks: {},
        meals: {},
      }),
    );

    setStoreRecipes({
      user: storageUser,
      favoriteRecipes: storageFavRecipes,
      doneRecipes: storageDoneRecipes,
      inProgressRecipes: storageInProgressRecipes,
    });
  }, []);
  // Anotação: É possível unir as duas funções abaixo em uma apenas.
  const handleDoneRecipes = (filter : string) => {
    const newDoneRecipes = filterRecipes(
      filter,
      JSON.parse(localStorage.getItem('doneRecipes') || '[]'),
    );

    setFilteredDoneRecipes(newDoneRecipes);
    setShowByDoneFilter(true);
  };
  const handleFavorites = (filter : string) => {
    const newFavRecipes = filterRecipes(
      filter,
      JSON.parse(localStorage.getItem('favoriteRecipes') || '[]'),
    );
    setFilteredFavRecipes(newFavRecipes);
    setShowByFavFilter(true);
  };

  const removeFavorites = (recipe : string) => {
    const newFavs = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
      .filter((favs :any) => favs.name !== recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setStoreRecipes({ ...storeRecipes, favoriteRecipes: newFavs });
  };

  // Recipes e SearchBar
  const handleRecipes = (newRecipes: FoodCardType[]) => {
    setRecipes(newRecipes);
  };

  return (
    <StoreContext.Provider
      value={ {
        handleDoneRecipes,
        handleFavorites,
        removeFavorites,
        handleRecipes,
        storeRecipes,
        recipes,
        showByDoneFilter,
        filteredDoneRecipes,
        showByFavFilter,
        filteredFavRecipes,
      } }
    >
      <div>
        {children}
      </div>
    </StoreContext.Provider>
  );
}

export default StoreProvider;
