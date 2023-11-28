import { useEffect, useState } from 'react';
import StoreContext from './StoreContext';
import { filterRecipes } from '../Utils/FilterRecipes';
import { FoodCardType, StoreProviderProps } from '../Utils/Types';
import { MockDoneRecipes2 } from '../Utils/Mock';

import mealsAPI from '../services/mealsAPI';
import drinksAPI from '../services/drinksAPI';
import mealsCategoriesAPI from '../services/mealsCategoriesAPI';
import drinksCategoriesAPI from '../services/drinksCategoriesAPI';
import filterByCategorie from '../Utils/filterByCateorie';

function StoreProvider({ children } : StoreProviderProps) {

  const [food, setFood] = useState('');
  const [storeRecipes, setStoreRecipes] = useState<StorageType>(mockStorage);
  const [doneRecipes, setDoneRecipes] = useState<FoodCardType[]>([]);
  const [storage, setStorage] = useState({} as StorageType);
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
        HandleFood,
        HandleDoneRecipes,
        HandleFavorites,
        RemoveFavorites,
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
