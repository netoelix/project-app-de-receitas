import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestApi } from '../Utils/ApiRequest';
import StoreContext from '../Context/StoreContext';
import DealResponse from '../Utils/DealResponse';

function RecipeInProgress() {
  const { id } = useParams();
  const { food } = useContext(StoreContext);
  const [recipe, setRecipe] = useState<any>({});
  console.log(id);
  console.log(food);

  useEffect(() => {
    async function requestRecipe() {
      if (id !== undefined) {
        const response = requestApi(food, 'id', id);
        const recipeData = await response;
        const recipeInProgress = recipeData[food];

        const [result] = DealResponse(food, recipeInProgress);
        setRecipe(result);
        // ;
      }
    }
    requestRecipe();
  }, [id, food]);
  const { image, name } = recipe;
  return (
    <div>
      <div>{id}</div>
      <img src={ image } alt="recipe-progress" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{name}</h1>
      <button data-testid="share-btn">ShareBtn</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <div data-testid="recipe-category">Categorias</div>
      <div data-testid="instructions"> Intruções</div>
      <div data-testid="finish-recipe-btn">Finalizar</div>
    </div>
  );
}

export default RecipeInProgress;
