import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { CategoryType, FoodCardType } from '../Utils/Types';
import CardRecipe from './CardRecipe';
import categoryFoods from '../Utils/categoryFoods';

export default function Recipes() {
  const { food } = useContext(StoreContext);
  const [data, setData] = useState([] as FoodCardType[]);
  const [recipes, setRecipes] = useState([] as FoodCardType[]);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [categorySelected, setCategorySelected] = useState('');

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
    async function requestCategories() {
      const response = await requestApi(food, `${food}-categories`, '');
      if (response[food]) {
        const result: CategoryType[] = response[food].slice(0, 5);
        setCategories(result);
      }
    }

    requestRecipes();
    requestCategories();
  }, [food]);

  async function changeRecipes(category: string) {
    if (category !== categorySelected) {
      const newRecipes = await categoryFoods(food, category);
      if (newRecipes) {
        setRecipes(newRecipes);
        setCategorySelected(category);
      }
    } else {
      setRecipes(data);
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
        onClick={ () => setRecipes(data) }
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
