import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestApi } from '../Utils/ApiRequest';
import { CardRecipe, FoodCardType } from '../Utils/Types';
import CheckIngredient from '../Components/CheckIngredient';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import DealResponse from '../Utils/DealResponse';
import { ButtonContainer, CategoryContainer, IngredientsContainer, InstructionsContainer, TitleContainer } from '../styles/StyledRecipeInProgress';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState({} as CardRecipe);
  const [filterIngredients, setFilterIngredients] = useState([] as string[]);
  const [linkCopied, setLinkCopied] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [finishRecipeBtn, setFinishRecipeBtn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function requestRecipe() {
      const path = window.location.pathname;
      const newFood = path.split('/')[1];
      const newId = path.split('/')[2];
      if (newId !== undefined) {
        const response = requestApi(newFood, 'id', newId);
        const recipeData = await response;
        const recipeInProgress = recipeData[newFood];
        const [result] = DealResponse(newFood, recipeInProgress);

        setRecipe(result);
        const ingredients = result.ingredients.filter((ingredient) => ingredient !== '');

        setFilterIngredients(ingredients);

        const storage = JSON.parse(localStorage.getItem('inProgressRecipes')
        || JSON.stringify({
          drinks: {},
          meals: {},
        }));

        if (!storage[newFood][newId]) {
          storage[newFood][newId] = [];
          localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
        }

        const favoriteRecipesStorage = JSON.parse(
          localStorage.getItem('favoriteRecipes') || JSON.stringify([]),
        );
        if (favoriteRecipesStorage.length > 0) {
          const findIsFavorite = favoriteRecipesStorage.some(
            (favRecipe: FoodCardType) => favRecipe.id === newId,
          );
          if (findIsFavorite) {
            setIsFavorite(true);
          }
        }

        // ;
      }
    }

    requestRecipe();
  });

  const handleShareClick = () => {
    const link = window.location.origin;
    navigator.clipboard.writeText(`${link}/${type}s/${id}`);
    setLinkCopied('Link copied!');
    // setTimeout(() => {
    //   setLinkCopied('');
    // }, 1000);
  };

  const handleFavClick = () => {
    const favRecipesLocalStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes') || JSON.stringify([]),
    );

    if (isFavorite) {
      const newArray = favRecipesLocalStorage.filter(
        (favRecipeStorage: FoodCardType) => favRecipeStorage.id !== id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setIsFavorite(false);
    } else {
      favRecipesLocalStorage.push({
        id,
        type,
        nationality: nationality || '',
        category: category || '',
        alcoholicOrNot: alcoholicOrNot || '',
        name,
        image,
      });
      localStorage.setItem('favoriteRecipes', JSON.stringify(favRecipesLocalStorage));
      setIsFavorite(true);
    }
  };

  const handleFinishRecipeBtn = () => {
    if (JSON.parse(
      localStorage.getItem('inProgressRecipes') as string,
    )[`${type}s`][id].length === filterIngredients.length) {
      setFinishRecipeBtn(false);
    } else {
      setFinishRecipeBtn(true);
    }
  };

  const handleClick = () => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')
    || JSON.stringify([]));
    doneRecipesStorage.push({
      id,
      type,
      nationality: nationality || '',
      category: category || '',
      alcoholicOrNot: alcoholicOrNot || '',
      name,
      image,
      doneDate: new Date(),
      tags,
    });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesStorage));
    navigate('/done-recipes');
  };

  const { image, name, instructions, category,
    id, type, ingredients, nationality, alcoholicOrNot, tags } = recipe;

  const content = (
    <div>
      <CategoryContainer>
        <div>
          <h3 data-testid="recipe-category">{category}</h3>
        </div>
        <div>
          <button
            data-testid="share-btn"
            onClick={ handleShareClick }
          >
            <img src={ shareIcon } alt="share button" />

          </button>
          <span id="link-copied" data-testid="message">{linkCopied}</span>
          <button onClick={ handleFavClick }>
            {isFavorite
              ? <img src={ blackHeartIcon } alt="full heart" data-testid="favorite-btn" />
              : <img
                  src={ whiteHeartIcon }
                  alt="empty heart"
                  data-testid="favorite-btn"
              />}
          </button>
        </div>
      </CategoryContainer>
      <TitleContainer>
        <h1 data-testid="recipe-title">{name}</h1>
        <img src={ image } alt="recipe-progress" data-testid="recipe-photo" />
      </TitleContainer>
      <IngredientsContainer>
        <h2>Ingredients</h2>
        <div>
          {filterIngredients.map((ingredient, index) => (<CheckIngredient
            ingredient={ ingredient }
            key={ ingredient }
            index={ index }
            type={ `${type}s` }
            id={ Number(id) }
            handleFinishRecipeBtn={ handleFinishRecipeBtn }
          />))}
        </div>
      </IngredientsContainer>
      <InstructionsContainer>
        <h2>Instructions</h2>
        <p data-testid="instructions">{instructions}</p>
      </InstructionsContainer>
      <ButtonContainer
        data-testid="finish-recipe-btn"
        disabled={ finishRecipeBtn }
        onClick={ handleClick }
      >
        FINISH RECIPE

      </ButtonContainer>
    </div>
  );

  return (
    <div>
      {(ingredients !== undefined) && content}
    </div>
  );
}
export default RecipeInProgress;
