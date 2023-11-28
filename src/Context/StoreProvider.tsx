import { useEffect, useState } from 'react';
import { FoodCardType, StorageType, StoreProviderProps } from '../Utils/Types';
import { mockStorage } from '../Utils/Mock';
import { filterRecipes } from '../Utils/FilterRecipes';
import StoreContext from './StoreContext';
import filterByCategorie from '../Utils/filterByCateorie';
import mealsAPI from '../services/mealsAPI';
import drinksAPI from '../services/drinksAPI';
import mealsCategoriesAPI from '../services/mealsCategoriesAPI';
import drinksCategoriesAPI from '../services/drinksCategoriesAPI';

function StoreProvider({ children } : StoreProviderProps) {
  const [food, setFood] = useState('');
  const [storage, setStorage] = useState({} as StorageType);
  const [storeRecipes, setStoreRecipes] = useState<StorageType>(mockStorage);
  const [meals, setMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [lastCategorieSelected, setLastCategorieSelected] = useState('');

  useEffect(() => {
    const getAPIInfos = async () => {
      const mealsAPIInfos = await mealsAPI();
      const drinksAPIInfos = await drinksAPI();
      const mealsCategoriesInfos = await mealsCategoriesAPI();
      const drinksCategoriesInfos = await drinksCategoriesAPI();
      setAllMeals(mealsAPIInfos);
      setAllDrinks(drinksAPIInfos);
      setMeals(mealsAPIInfos);
      setDrinks(drinksAPIInfos);
      setMealsCategories(mealsCategoriesInfos);
      setDrinksCategories(drinksCategoriesInfos);
    };
    getAPIInfos();
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

  const categorieSelected = async (categorie: string, type: string) => {
    if (categorie === lastCategorieSelected) {
      if (type === 'Meal') {
        setMeals(allMeals);
      } else {
        setDrinks(allDrinks);
      }
      setLastCategorieSelected('');
    } else {
      const items = await filterByCategorie(categorie, type);
      if (type === 'Meal') {
        setMeals(items);
      } else {
        setDrinks(items);
      }
      setLastCategorieSelected(categorie);
    }
  };

  const clearFilter = (type: string) => {
    if (type === 'Meal') {
      setMeals(allMeals);
    } else {
      setDrinks(allDrinks);
    }
  };

  return (
    <StoreContext.Provider
      value={ {
        food,
        handleFood,
        handleDoneRecipes,
        handleFavorites,
        removeFavorites,
        storeRecipes,
        meals,
        drinks,
        mealsCategories,
        drinksCategories,
        categorieSelected,
        clearFilter,
      } }
    >
      <div>
        {children}
      </div>
    </StoreContext.Provider>
  );
}

export default StoreProvider;
