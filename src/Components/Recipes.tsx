import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { CategoryType, FoodCardType } from '../Utils/Types';
import CardRecipe from './CardRecipe';
import categoryFoods from '../Utils/categoryFoods';

export default function Recipes() {
  const { recipes } = useContext(StoreContext);
  const [data, setData] = useState([] as FoodCardType[]);
  const [cards, setCard] = useState([] as FoodCardType[]);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [categorySelected, setCategorySelected] = useState('');

  const path = window.location.pathname;
  const newFood = path.split('/')[1];

  // O primeiro Effect é chamado quando a página é carregada.
  useEffect(() => {
    async function requestRecipes() {
      const response = await requestApi(newFood, '', '');

      if (response[newFood]) {
        const result = response[newFood].slice(0, 12);
        const newList :FoodCardType[] = DealResponse(newFood, result);
        setData(newList);
        setCard(newList);
      }
    }
    async function requestCategories() {
      const response = await requestApi(newFood, 'categories', '');
      if (response[newFood]) {
        const result: CategoryType[] = response[newFood].slice(0, 5);
        setCategories(result);
      }
    }

    requestRecipes();
    requestCategories();
  }, [newFood]);

  // O segundo Effect é chamado quando a variável recipes é alterada pelo searchBar
  useEffect(() => {
    setCard(recipes);
  }, [recipes]);

  async function changeRecipes(category: string) {
    if (category !== categorySelected) {
      const newRecipes = await categoryFoods(newFood, category);
      console.log(newRecipes);

      if (newRecipes) {
        setCard(newRecipes);
        setCategorySelected(category);
      }
    } else {
      setCard(data);
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
        onClick={ () => setCard(data) }
      >
        All

      </button>
    </div>
  );

  return (
    <div>
      {FilterCategories}
      {
  cards.map((recipe, index) => (
    <div key={ index }>
      <Link to={ `/${newFood}/${recipe.id}` }>
        <CardRecipe food={ recipe } page="recipes" index={ index } />
      </Link>
    </div>))
      }
    </div>
  );
}
