import { useContext, useEffect, useState } from 'react';
import StoreContext from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { FoodCardType } from '../Utils/Types';
import CardRecipe from './CardRecipe';

export default function Recipes() {
  const { food } = useContext(StoreContext);
  const [data, setData] = useState([] as FoodCardType[]);
  const [recipes, setRecipes] = useState([] as FoodCardType[]);

  useEffect(() => {
    async function requestRecipes() {
      const response = await requestApi(food, '', '');
      if (response[food]) {
        const result = response[food].slice(0, 12);
        const newList :FoodCardType[] = DealResponse(food, result);
        setData(newList);
        setRecipes(newList);
      }
    }

    requestRecipes();
  }, [food]);
  console.log(data);

  const FilterMeals = (
    <div>
      <button data-testid="All-category-filter">All</button>
      <button data-testid="Side-category-filter">Side</button>
      <button data-testid="Seafood-category-filter">Seafood</button>
      <button data-testid="Beef-category-filter">Beef</button>
      <button data-testid="Vegetarian-category-filter">Vegetarian</button>
      <button data-testid="Pork-category-filter">Pork</button>
    </div>
  );
  const FilterDrinks = (
    <div>
      <button data-testid="All-category-filter">All</button>
      <button data-testid="Cocktail-category-filter">Cocktail</button>
      <button data-testid="Ordinary-Drink-category-filter">Ordinary Drink</button>
      <button data-testid="Other/Unknown-Drink-category-filter">Other/Unknown</button>
      <button data-testid="Shake-category-filter">Shake</button>
      <button data-testid="Cocoa-category-filter">Cocoa</button>
    </div>
  );

  return (
    <div>
      {(food === 'meals') ? FilterMeals : FilterDrinks}
      {
  recipes.map((recipe, index) => (
    <CardRecipe key={ index } food={ recipe } page="recipes" index={ index } />))
      }
    </div>
  );
}
