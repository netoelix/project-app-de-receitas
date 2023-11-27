import React from 'react';

export type MealsType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
};

export type DrinksType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
};

export type ContextType = {
  meals: MealsType[],
  drinks: DrinksType[],
};

export type ContextProviderProps = {
  children: React.ReactNode;
};

export type RecipesTypeType = {
  recipesType: 'meals' | 'drinks';
};
