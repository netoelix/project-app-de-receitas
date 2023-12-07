import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { CategoryType, FoodCardType } from '../Utils/Types';
import CardRecipe from './CardRecipe';
import {
  imagesIconsMeals, allFoodIcon,
  imagesIconsDrinks, drinkIcon,
} from '../Utils/exportIcons';
import { CategoriesContainer, FinalContainer, ImageContainer,
  TextContainer } from '../styles/StyledMealsAndDrinks';

export default function Recipes() {
  const { recipes } = useContext(StoreContext);
  const [data, setData] = useState([] as FoodCardType[]);
  const [cards, setCard] = useState([] as FoodCardType[]);
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [categorySelected, setCategorySelected] = useState('');
  const [allIcon, setAllIcon] = useState(allFoodIcon);

  const path = window.location.pathname;
  const newFood = path.split('/')[1];

  // O primeiro Effect é chamado quando a página é carregada.
  useEffect(() => {
    async function requestRecipes() {
      const response = await requestApi(newFood, '', '');

      if (response[newFood]) {
        const result = response[newFood].slice(0, 12);
        const newList: FoodCardType[] = DealResponse(newFood, result);
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
      const response = await requestApi(newFood, 'category-data', category);
      const newRecipes = DealResponse(newFood, response[newFood]).slice(0, 12);

      if (newRecipes) {
        setCard(newRecipes);
        setCategorySelected(category);
      }
    } else {
      setCard(data);
      setCategorySelected('');
    }
  }

  useEffect(() => {
    const iconsATT = () => {
      if (path === '/meals') {
        setAllIcon(allFoodIcon);
      }
      if (path === '/drinks') {
        setAllIcon(drinkIcon);
      }
    };
    iconsATT();
  }, [path]);

  const icons = (index: number) => {
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
        onClick={ () => setCard(data) }
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
      <FinalContainer>
        {
        cards.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${newFood}/${recipe.id}` }>
              <CardRecipe food={ recipe } page="recipes" index={ index } />
            </Link>
          </div>))
      }
      </FinalContainer>
    </div>
  );
}
