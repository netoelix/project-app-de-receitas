import { useContext } from 'react';
import Context from '../context/Context';
import { RecipesTypeType } from '../types';

export default function Recipes({ recipesType }: RecipesTypeType) {
  const { meals, drinks } = useContext(Context);

  return (
    <div>
      {recipesType === 'meals' ? (
        <>
          <h2>Meals</h2>
          {meals.slice(0, 12).map((meal, index) => (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }>{meal.strMeal}</h4>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2>Drinks</h2>
          {drinks.slice(0, 12).map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }>{drink.strDrink}</h4>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
