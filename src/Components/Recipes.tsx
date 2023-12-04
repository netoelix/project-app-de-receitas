import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { CategoryType, FoodCardType } from '../Utils/Types';
import CardRecipe from './CardRecipe';
import categoryFoods from '../Utils/categoryFoods';

export default function Recipes() {
  const { food, recipes, handleRecipes } = useContext(StoreContext);
  const [data, setData] = useState([] as FoodCardType[]);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [categorySelected, setCategorySelected] = useState('');

  useEffect(() => {
    async function requestRecipes() {
      const path = window.location.pathname;
      const newFood = path.split('/')[1];

      const response = await requestApi(newFood, '', '');

      if (response[newFood]) {
        const result = response[newFood].slice(0, 12);
        const newList :FoodCardType[] = DealResponse(newFood, result);
        setData(newList);
        handleRecipes(newList);
      }
    }
    async function requestCategories() {
      const response = await requestApi(food, 'categories', '');
      if (response[food]) {
        const result: CategoryType[] = response[food].slice(0, 5);
        setCategories(result);
      }
    }
    if (recipes.length === 0) {
      requestRecipes();
    }
    requestCategories();
  }, [food, handleRecipes, recipes]);

  async function changeRecipes(category: string) {
    console.log(food);
    console.log(category);

    if (category !== categorySelected) {
      const newRecipes = await categoryFoods(food, category);
      if (newRecipes) {
        handleRecipes(newRecipes);
        setCategorySelected(category);
      }
    } else {
      handleRecipes(data);
      setCategorySelected('');
    }
  }

  const FilterCategories = (
    <div>
      {categories.map(({ strCategory }, index) => (
        <button
          key={ index }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => changeRecipes(strCategory) }
        >
          {strCategory}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ () => handleRecipes(data) }
      >
        All

      </button>
    </div>
  );

  return (
    <div>
      {FilterCategories}
      {
  recipes.map((recipe, index) => (
    <div key={ index }>
      <Link to={ `/${food}/${recipe.id}` }>
        <CardRecipe food={ recipe } page="recipes" index={ index } />
      </Link>
    </div>))
      }
    </div>
  );
}
