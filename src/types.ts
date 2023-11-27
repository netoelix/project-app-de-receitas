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

export type StrCategoryType = {
  strCategory: string,
};

export type ContextType = {
  meals: MealsType[],
  drinks: DrinksType[],
  mealsCategories: StrCategoryType[],
  drinksCategories: StrCategoryType[],
};

export type ContextProviderProps = {
  children: React.ReactNode;
};

export type RecipesType = {
  title: string,
  recipes: MealsType[] | DrinksType[],
  categories: StrCategoryType[],
};
