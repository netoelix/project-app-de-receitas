import { drinksAPIData } from './drinksAPIData';
import { drinksByOrdinaryDrinksCategorieAPIData } from './drinksByCategorieAPIData';
import { drinksCategoriesAPIData } from './drinksCategoriesAPIData';
import { mealsAPIData } from './mealsAPIData';
import { mealsByBeefCategorieAPIData } from './mealsByBeefCategorieAPIData';
import { mealsCategoriesAPIData } from './mealsCategoriesAPIData';

export const mockFetch = (url: string) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(mealsAPIData);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(drinksAPIData);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mealsCategoriesAPIData);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(drinksCategoriesAPIData);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
      return Promise.resolve(mealsByBeefCategorieAPIData);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') {
      return Promise.resolve(drinksByOrdinaryDrinksCategorieAPIData);
    }
  },
});
