import { useContext } from 'react';
import { store } from '../Context/StoreContext';
import { requestApi } from '../Utils/ApiRequest';

function RecipeInProgress({
  strMealThumb,
  strArea,
  strCategory,
  isAlcoholic,
  ingredientsList,
  strInstructions } : any) {
  const { Food } = useContext(store);
  console.log(Food);

  return (
    <div>
      <h1 data-testid="recipe-title">{strArea}</h1>
      <img src={ strMealThumb } alt={ strArea } data-testid="recipe-photo" />
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="is-alcoholic">{isAlcoholic ? 'Alcoólico' : 'Não alcoólico'}</p>
      <ul data-testid="ingredients-list">
        {ingredientsList.map((ingredient, index) => (
          <li key={ index }>
            <label data-testid={ `${index}-ingredient-step` }>
              <input type="checkbox" />
              {ingredient}
            </label>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default RecipeInProgress;
