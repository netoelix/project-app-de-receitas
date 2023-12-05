import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RecipeDetailsProps } from '../Utils/Types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { requestApi } from '../Utils/ApiRequest';
import Recommendations from '../Components/Recommendation';
import { ButtonContainer, CategoryContainer, IngredientsContainer, InstructionsContainer, TitleContainer, VideoContainer } from '../styles/StyledRecipeDetails';
import { shareIcon } from '../Utils/exportIcons';

function RecipeDetails() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsProps>({});
  const [doneRecipes, setDoneRecipes] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [favButton, setFavButton] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const recipeDone = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const isRecipeDone = recipeDone.some((recipe: any) => recipe.id === id);

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')
    || '{}');
  const isRecipeInProgress = recipesInProgress[type as string]?.[id as string];

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const path = window.location.pathname;
      const newFood = path.split('/')[1];
      const newId = path.split('/')[2];
      if (newId !== undefined) {
        const response = requestApi(newFood, 'id', newId);
        const recipeData = await response;
        const recipeDetailData = recipeData[newFood];

        setRecipeDetails(recipeDetailData[0]);

        //   let apiUrl;

        //   if (type === 'meals') {
        //     apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        //   } else if (type === 'drinks') {
        //     apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        //   }

        //   if (apiUrl) {
        //     const response = await fetch(apiUrl);
        //     const data = await response.json();
        //     setRecipeDetails(data.meals ? data.meals[0] : data.drinks[0]);
        //   } else {
        //     console.error('A URL da API não está definida.');
        //   }
        // }

        const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes')
    || JSON.stringify([]));
        if (favoriteRecipesStorage.length > 0) {
          const findIsFavorite = favoriteRecipesStorage
            .some((favRecipe: any) => favRecipe.id === id);
          if (findIsFavorite) {
            setFavButton(true);
          }
        }
      }
    };

    setDoneRecipes(isRecipeDone);
    setRecipeInProgress(!!isRecipeInProgress);
    fetchRecipeDetails();
  }, [type, id, isRecipeDone, isRecipeInProgress]);

  const recipeButton = () => {
    navigate(`/${type}/${id}/in-progress`);
  };

  const shareButton = () => {
    const recipeLink = window.location.href;

    navigator.clipboard.writeText(recipeLink)
      .then(() => {
        setCopyMessage('Link copied!');
      });
  };

  const favoriteButton = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')
    || JSON.stringify([]));

    if (favButton) {
      const updatedFavorites = favoriteRecipes.filter((recipe: any) => recipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
      setFavButton(false);
    } else {
      favoriteRecipes.push({
        id,
        type: type === 'meals' ? 'meal' : 'drink',
        nationality: type === 'meals' ? recipeDetails.strArea : '',
        category: recipeDetails.strCategory,
        alcoholicOrNot: type === 'drinks' ? recipeDetails.strAlcoholic : '',
        name: recipeDetails.strMeal || recipeDetails.strDrink,
        image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      });

      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavButton(true);
    }
  };

  return (
    <div>
      <CategoryContainer>
        <div>
          {type === 'meals' && (
            <>
              <p data-testid="recipe-category">
                {recipeDetails.strCategory}
              </p>
              <p>
                {recipeDetails.strArea}
              </p>
            </>
          )}
          {type === 'drinks' && (
            <p data-testid="recipe-category">
              {recipeDetails.strCategory}
              <br />
              {recipeDetails.strAlcoholic}
            </p>
          )}
        </div>
        <div>
          <button
            onClick={ shareButton }
            data-testid="share-btn"
          >
            <img src={ shareIcon } alt={ shareIcon } />
          </button>
          <div data-tesid="copy">{copyMessage}</div>
          <button
            onClick={ favoriteButton }
          >
            <img
              data-testid="favorite-btn"
              src={ favButton ? blackHeartIcon : whiteHeartIcon }
              alt={ favButton ? 'Favorited' : 'Unfavorited' }
            />
          </button>
        </div>
      </CategoryContainer>
      <TitleContainer>
        <h1 data-testid="recipe-title">
          {recipeDetails.strMeal || recipeDetails.strDrink}
        </h1>
        <img
          src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
          alt="Recipe"
          data-testid="recipe-photo"
          width="350px"
        />
      </TitleContainer>
      <IngredientsContainer>
        <h2>Ingredients</h2>
        <ul>
          {Object.entries(recipeDetails)
            .filter(([key, value]) => key.startsWith('strIngredient') && value)
            .map(([key, ingredient], index) => {
              const measureKey = `strMeasure${key.split('strIngredient')[1]}`;
              const measure = (recipeDetails as any)[measureKey];
              return (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {`${ingredient}: ${measure}`}
                </li>
              );
            })}
        </ul>
      </IngredientsContainer>
      <InstructionsContainer>
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      </InstructionsContainer>
      {type === 'meals' && recipeDetails.strYoutube && (
        <VideoContainer>
          <h2 data-testid="video">Video</h2>
          <iframe
            title="Recipe Video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.slice(-11)}` }
            allowFullScreen
            data-testid="video"
          />
        </VideoContainer>
      )}
      <div>
        {type && (
          <div>
            <Recommendations type={ type } />
          </div>
        )}
      </div>
      {!doneRecipes
      && (
        <ButtonContainer
          className="Start-Recipe"
          data-testid="start-recipe-btn"
        // style={ { display: doneRecipes ? 'none' : 'block' } }
          onClick={ recipeButton }
        >
          {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </ButtonContainer>)}
    </div>
  );
}

export default RecipeDetails;
