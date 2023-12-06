import { useEffect, useState } from 'react';
import { FoodCardType, StorageType } from '../Utils/Types';
import { filterRecipes } from '../Utils/FilterRecipes';
import StoreContext from './StoreContext';

export type StoreProviderProps = {
  children: React.ReactNode;
};

function StoreProvider({ children } : StoreProviderProps) {
  const [food, setFood] = useState('');
  const [storage, setStorage] = useState({} as StorageType);
  const [storeRecipes, setStoreRecipes] = useState<StorageType>({} as StorageType);
  const [recipesScreen, setRecipesScreen] = useState<FoodCardType[]>([]);

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
    setStorage({
      user: storageUser,
      favoriteRecipes: storageFavRecipes,
      doneRecipes: storageDoneRecipes,
      inProgressRecipes: storageInProgressRecipes,
    });
  }, []);

  const handleFood = (page: string) => {
    setFood(page);
  };
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
    console.log(localStorage.getItem('favoriteRecipes') || '[]');

    const newFavs = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
      .filter((favs :any) => favs.name !== recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setStorage({ ...storage, favoriteRecipes: newFavs });
    setStoreRecipes({ ...storeRecipes, favoriteRecipes: newFavs });
  };

  const handleScreen = (filter : string, List: FoodCardType[]) => {
    console.log(filter, List);
    setRecipesScreen(List);
  };

  // Recipes e SearchBar
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
