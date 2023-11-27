import { useEffect, useState } from 'react';
import drinksAPI from '../services/drinksAPI';
import foodsAPI from '../services/mealsAPI';
import { ContextProviderProps, DrinksType, MealsType } from '../types';
import Context from './Context';

// Criando a lógica de um provider falso para depois transferir para o arquivo correto.

export default function ContextProvider({ children }: ContextProviderProps) {
  const [meals, setMeals] = useState<MealsType[]>([]);
  const [drinks, setDrinks] = useState<DrinksType[]>([]);

  useEffect(() => {
    const getAPIInfos = async () => {
      const mealsRecipes = await foodsAPI();
      const drinksRecipes = await drinksAPI();
      setMeals(mealsRecipes);
      setDrinks(drinksRecipes);
    };
    getAPIInfos();
  }, []);

  return (
    <Context.Provider value={ { meals, drinks } }>
      {children}
    </Context.Provider>
  );
}
