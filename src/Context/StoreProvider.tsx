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
  const [doneRecipes, setDoneRecipes] = useState<FoodCardType[]>([]);
  const [storage, setStorage] = useState<FoodCardType[]>([]);
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
        doneRecipes,
        HandleDoneRecipes,
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
