import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { requestApi } from '../Utils/ApiRequest';

function RecipeInProgress() {
  const drink = 'drinks';
  const meal = 'meals';

  const [data, setData] = useState([{}] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<Array<string>>([]);

  const { id } = useParams();
  // ID da comida, 52768
  // ID da bebida, 17222

  const recipe = data.find((item) => item.idMeal === id || item.idDrink === id);

  async function handleSearch() {
    const apiReturn = await requestApi(drink, 'firstLetter', 'a');
    const mealData = apiReturn[meal];
    const drinkData = apiReturn[drink];

    if (mealData !== undefined) {
      return setData(mealData);
    }
    if (drinkData !== undefined) {
      console.log(drinkData);

      return setData(drinkData);
    }
    return setData(apiReturn);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await handleSearch();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (recipe) {
      const newIngredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        if (ingredient) {
          newIngredients.push(ingredient);
        }
      }
      setIngredients(newIngredients);
    }
  }, [recipe]);

  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  useEffect(() => {
    const savedState = localStorage.getItem('inProgressRecipes');
    if (savedState) {
      setCheckedItems(JSON.parse(savedState));
    }
  }, []);

  const handleCheckChange = (index: number) => {
    let newCheckedItems;
    if (checkedItems.includes(index)) {
      newCheckedItems = checkedItems.filter((item) => item !== index);
    } else {
      newCheckedItems = [...checkedItems, index];
    }
    setCheckedItems(newCheckedItems);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newCheckedItems));
  };

  return (
    isLoading
      ? <p>Carregando...</p>
      : <div>
        <div>
          <h1 data-testid="recipe-title">{recipe.strArea || recipe.strDrink}</h1>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strArea || recipe.strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <p data-testid="is-alcoholic">
            {
      recipe.strAlcoholic ? 'Alcoólico' : 'Não alcoólico'
}

          </p>
          <ul data-testid="ingredients-list">
            {ingredients.map((ingredient, index) => (
              <li key={ index }>
                <label data-testid={ `${index}-ingredient-step` }>
                  <input type="checkbox" onChange={ () => handleCheckChange(index) } />
                  <span
                    style={ { textDecoration: checkedItems.includes(index)
                      ? 'line-through' : 'none' } }
                  >
                    {ingredient}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        <button data-testid="finish-recipe-btn">Finalizar Receita</button>
        </div>
  );
}

export default RecipeInProgress;
