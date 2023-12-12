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
import LoadingPage from '../Pages/Loading';

export default function Recipes() {
  const { recipes, setLoadingPage, loadingPage } = useContext(StoreContext);

  const [data, setData] = useState([] as FoodCardType[]);
  const [cards, setCard] = useState([] as FoodCardType[]);
  const [screen, setScreen] = useState([] as FoodCardType[]);

  const [categories, setCategories] = useState([] as CategoryType[]);
  const [categorySelected, setCategorySelected] = useState('');
  const [allIcon, setAllIcon] = useState(allFoodIcon);

  const path = window.location.pathname;
  const newFood = path.split('/')[1];
  const endList = document.getElementById('Plus');
  // O primeiro Effect é chamado quando a página é carregada.
  useEffect(() => {
    async function requestRecipes() {
      setLoadingPage(true);
      const response = await requestApi(newFood, '', '');
      if (response[newFood]) {
        const result = response[newFood];
        const newList: FoodCardType[] = DealResponse(newFood, result);
        setData(newList);
        setCard(newList);
      }
      setLoadingPage(false);
    }
    async function requestCategories() {
      setLoadingPage(true);
      const response = await requestApi(newFood, 'categories', '');
      if (response[newFood]) {
        const result: CategoryType[] = response[newFood].slice(0, 5);
        setCategories(result);
      }
      setLoadingPage(false);
    }

    requestRecipes();
    requestCategories();
  }, [newFood, setLoadingPage]);

  // O segundo Effect é chamado quando a variável recipes é alterada pelo searchBar
  useEffect(() => {
    setCard(recipes);
  }, [recipes]);

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

  useEffect(() => {
    setScreen(cards.slice(0, 12));
  }, [cards]);

  async function changeRecipes(category: string) {
    setLoadingPage(true);
    if (category !== categorySelected) {
      const response = await requestApi(newFood, 'category-data', category);
      const newRecipes = DealResponse(newFood, response[newFood]);

      if (newRecipes) {
        setCard(newRecipes);
        setCategorySelected(category);
      }
    } else {
      setCard(data);
      setCategorySelected('');
    }
    setLoadingPage(false);
  }

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

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      renderCards();
    }
  });
  if (endList)observer.observe(endList);

  const renderCards = () => {
    const NCards = (screen.length + 4) > cards.length ? cards.length : screen.length + 4;
    setScreen(cards.slice(0, NCards));
  };

  if (loadingPage) return <LoadingPage />;
  return (
    <div>
      {FilterCategories}
      <FinalContainer>
        {
        screen.map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${newFood}/${recipe.id}` }>
              <CardRecipe food={ recipe } page="recipes" index={ index } />
            </Link>
          </div>))
      }
      </FinalContainer>
      <div>
        <button id="Plus" onClick={ renderCards }>+Cards</button>
        <h1>TST</h1>

      </div>
    </div>
  );
}
