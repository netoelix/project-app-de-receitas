import { useEffect, useState } from 'react';
import { FoodCardType, StorageType } from '../Utils/Types';
import { filterRecipes } from '../Utils/FilterRecipes';
import StoreContext from './StoreContext';

export type StoreProviderProps = {
  children: React.ReactNode;
};
// Se um type só é usado em um compoenente,deixa nele.

function StoreProvider({ children } : StoreProviderProps) {
  const [food, setFood] = useState('');
  const [storage, setStorage] = useState({} as StorageType);
  const [storeRecipes, setStoreRecipes] = useState<StorageType>({} as StorageType);
  const [recipesScreen, setRecipesScreen] = useState<FoodCardType[]>([]);
  const [recipes, setRecipes] = useState([] as FoodCardType[]);
  const [showByDoneFilter, setShowByDoneFilter] = useState(false);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [showByFavFilter, setShowByFavFilter] = useState(false);
  const [filteredFavRecipes, setFilteredFavRecipes] = useState([]);

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

    // const favStorage = { favoriteRecipes: storageFavRecipes };
    // const doneStorage = { doneRecipes: storageDoneRecipes };

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
    // if (storageFavRecipes.length !== 0) setStorage(favStorage);
    // if (storageDoneRecipes.length !== 0) setStorage(doneStorage);

    // if (localStorage.getItem('inProgressRecipes') === null) {
    //   localStorage.setItem('inProgressRecipes', JSON.stringify({
    //     drinks: {},
    //     meals: {},
    //   }));
    // }

    // if (localStorage.getItem('favoriteRecipes') === null) {
    //   localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    // }
  }, []);

  const handleFood = (page: string) => {
    setFood(page);
  };
  const handleDoneRecipes = (filter : string) => {
    const newDoneRecipes = filterRecipes(
      filter,
      JSON.parse(localStorage.getItem('doneRecipes')),
    );
    // setStoreRecipes({ ...storeRecipes, doneRecipes: newDoneRecipes });
    setFilteredDoneRecipes(newDoneRecipes);
    setShowByDoneFilter(true);
  };
  const handleFavorites = (filter : string) => {
    const newFavRecipes = filterRecipes(
      filter,
      JSON.parse(localStorage.getItem('favoriteRecipes')),
    );
    // const newStore = { ...storeRecipes, favoriteRecipes: newFavRecipes };
    // setStoreRecipes(newStore);
    setFilteredFavRecipes(newFavRecipes);
    setShowByFavFilter(true);
  };
  const removeFavorites = (recipe : string) => {
    const newFavs = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((favs) => favs.name !== recipe);
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
