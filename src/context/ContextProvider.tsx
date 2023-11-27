import { useEffect, useState } from 'react';
import drinksAPI from '../services/drinksAPI';
import { ContextProviderProps } from '../types';
import Context from './Context';
import mealsCategoriesAPI from '../services/mealsCategoriesAPI';
import drinksCategoriesAPI from '../services/drinksCategoriesAPI';
import mealsAPI from '../services/mealsAPI';

// Criando a lógica de um provider falso para depois transferir para o arquivo correto.

export default function ContextProvider({ children }: ContextProviderProps) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  useEffect(() => {
    const getAPIInfos = async () => {
      const mealsAPIInfos = await mealsAPI();
      const drinksAPIInfos = await drinksAPI();
      const mealsCategoriesInfos = await mealsCategoriesAPI();
      const drinksCategoriesInfos = await drinksCategoriesAPI();
      setMeals(mealsAPIInfos);
      setDrinks(drinksAPIInfos);
      setMealsCategories(mealsCategoriesInfos);
      setDrinksCategories(drinksCategoriesInfos);
    };
    getAPIInfos();
  }, []);

  return (
    <Context.Provider value={ { meals, drinks, mealsCategories, drinksCategories } }>
      {children}
    </Context.Provider>
  );
}
