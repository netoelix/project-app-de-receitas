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
        setFilterIngredients(ingredients);

        const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

        if (storage[newFood][newId] === undefined) {
          storage[newFood][newId] = [];
          localStorage.setItem('inProgressRecipes', JSON.stringify(storage));
        }

        // ;
      }
    }
    requestRecipe();
  }, []);

  const { image, name, instructions, category, id, type } = recipe;

  return (
    <div>
      <img src={ image } alt="recipe-progress" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{name}</h1>
      <h3 data-testid="recipe-category">{category}</h3>
      <button data-testid="share-btn">ShareBtn</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <div>
        {filterIngredients.map((ingredient, index) => (<CheckIngredient
          ingredient={ ingredient }
          key={ ingredient }
          index={ index }
          type={ `${type}s` }
          id={ Number(id) }
        />))}
      </div>
      <h2>Instruções</h2>
      <p data-testid="instructions">{instructions}</p>
      <button data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

export default RecipeInProgress;
