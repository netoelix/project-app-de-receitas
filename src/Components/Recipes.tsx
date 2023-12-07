import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { CategoryType, FoodCardType } from '../Utils/Types';
import CardRecipe from './CardRecipe';
import categoryFoods from '../Utils/categoryFoods';
import {
  imagesIconsMeals, allFoodIcon,
  imagesIconsDrinks, drinkIcon,
} from '../Utils/exportIcons';
import { CategoriesContainer, ImageContainer,
  TextContainer } from '../styles/StyledMealsAndDrinks';
import styles from '../styles/StylesMeals.module.css';

export default function Recipes() {
  const { food, recipes, handleRecipes } = useContext(StoreContext);
  const [data, setData] = useState([] as FoodCardType[]);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [categorySelected, setCategorySelected] = useState('');
  const [allIcon, setAllIcon] = useState(allFoodIcon);

  useEffect(() => {
    async function requestRecipes() {
      const path = window.location.pathname;
      const newFood = path.split('/')[1];

      const response = await requestApi(newFood, '', '');

      if (response[newFood]) {
        const result = response[newFood].slice(0, 12);
        const newList: FoodCardType[] = DealResponse(newFood, result);
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

  useEffect(() => {
    const iconsATT = () => {
      const path = window.location.pathname;
      if (path === '/meals') {
        setAllIcon(allFoodIcon);
      }
      if (path === '/drinks') {
        setAllIcon(drinkIcon);
      }
    };
    iconsATT();
  }, []);

  const icons = (index: number) => {
    const path = window.location.pathname;
    if (path === '/meals') {
      return imagesIconsMeals[index];
    }
    if (path === '/drinks') {
      return imagesIconsDrinks[index];
    }
  };

  const FilterCategories = (
    <CategoriesContainer>

      <button
        data-testid="All-category-filter"
        onClick={ () => handleRecipes(data) }
      >
        <ImageContainer>
          <img src={ allIcon } alt="Button" />
        </ImageContainer>

        <TextContainer>
          All
        </TextContainer>

      </button>

      {
        categories.map(({ strCategory }, index) => (
          <button
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => changeRecipes(strCategory) }
          >
            <ImageContainer>
              <img src={ icons(index) } alt={ `Button-${icons(index)}` } />
            </ImageContainer>

            <TextContainer>
              {strCategory}
            </TextContainer>

          </button>
        ))
      }

    </CategoriesContainer>
  );

  return (
    <div>
      {FilterCategories}
      {
        recipes.map((recipe, index) => (
          <div key={ index } className={ styles.teste }>
            <Link to={ `/${food}/${recipe.id}` }>
              <CardRecipe food={ recipe } page="recipes" index={ index } />
            </Link>
          </div>))
      }
    </div>
  );
}
