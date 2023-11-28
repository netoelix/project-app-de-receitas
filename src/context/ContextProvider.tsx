import { useEffect, useState } from 'react';
import drinksAPI from '../services/drinksAPI';
import { ContextProviderProps } from '../types';
import Context from './Context';
import mealsCategoriesAPI from '../services/mealsCategoriesAPI';
import drinksCategoriesAPI from '../services/drinksCategoriesAPI';
import mealsAPI from '../services/mealsAPI';
import filterByCategorie from '../services/filterByCateorie';

// Criando a lógica de um provider falso para depois transferir para o arquivo correto.

export default function ContextProvider({ children }: ContextProviderProps) {
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
  }, []);

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
    <Context.Provider
      value={ {
        meals,
        drinks,
        mealsCategories,
        drinksCategories,
        categorieSelected,
        clearFilter,
      } }
    >
      {children}
    </Context.Provider>
  );
}
