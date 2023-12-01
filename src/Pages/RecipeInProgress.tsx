import { useEffect, useState } from 'react';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { CardRecipe } from '../Utils/Types';
import CheckIngredient from '../Components/CheckIngredient';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState({} as CardRecipe);
  const [filterIngredients, setFilterIngredients] = useState([] as string[]);

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
        console.log(result);

        setFilterIngredients(ingredients);
      }
    }
    requestRecipe();
  }, []);
  console.log(recipe);
  const content = (
    <div>
      <img src={ recipe.image } alt="recipe-progress" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{recipe.name}</h1>
      <button data-testid="share-btn">ShareBtn</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <div data-testid="recipe-category">
        {filterIngredients.map((ingredient, index) => (<CheckIngredient
          ingredient={ ingredient }
          key={ ingredient }
          index={ index }
        />))}
      </div>
      <div data-testid="instructions"> Intruções</div>
      <button data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );

  return (
    <div>
      {(recipe.ingredients !== undefined) && content}
    </div>
  );
}
export default RecipeInProgress;
