import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// import { processIngredients, useCheckItems,
//   useDoneRecipes,
//   useFavorite, useShare } from '../Utils/RecipeInProgress';
import IngredientsList from '../Components/IngredientList';
// import ShareFavoriteButtons from '../Components/ShareFavoriteButtons';
import StoreContext from '../Context/StoreContext';
import { FoodCardType } from '../Utils/Types';

function RecipeInProgress() {
  const location = useLocation();
  const path = location.pathname;
  const { id } = useParams();
  const { food, recipes } = useContext(StoreContext);
  const { checkedIngredients, handleCheck } = useCheckItems();
  const { isLinkCopied, handleShare } = useShare();

  const navigate = useNavigate();

  // const { data, isLoading } = useFetchData(path
  //   .includes('meals') ? 'meals' : 'drinks', id);

  // const recipe = data[0];
  const recipe = recipes.find((element) => element.id === id);

  const { saveRecipe } = useDoneRecipes(recipe);

  const { isFavorite, toggleFavorite } = useFavorite(recipe);

  const allIngredientsChecked = recipe && processIngredients(recipe).every(
    (ingredient) => checkedIngredients.includes(ingredient),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 data-testid="recipe-title">{recipe.name}</h1>
      <img
        src={ recipe.image }
        alt={ `imagem de um ${recipe.name}` }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-category">{recipe.category}</p>
      { food === 'drinks'
      && <p data-testid="is-alcoholic">{recipe.alcoholicOrNot}</p>}
      <IngredientsList
        ingredients={ processIngredients(recipe) }
        checkedIngredients={ checkedIngredients }
        onIngredientCheck={ handleCheck }
      />
      <p data-testid="instructions">{recipe.instructions}</p>
      {/* <ShareFavoriteButtons
        isLinkCopied={ isLinkCopied }
        onShare={ handleShare }
        isFavorite={ isFavorite }
        onToggleFavorite={ toggleFavorite }
      /> */}

      <button
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ () => {
          saveRecipe();
        } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default RecipeInProgress;
