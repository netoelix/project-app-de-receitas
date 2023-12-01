type IngredientListProps = {
  ingredients: string[];
  checkedIngredients: any,
  onIngredientCheck: (ingredient: string) => void,
};

function IngredientsList({
  ingredients,
  checkedIngredients,
  onIngredientCheck }: IngredientListProps) {
  return (
    <ul data-testid="ingredients-list">
      {ingredients.map((ingredient, index) => (
        <div key={ index }>
          <label
            htmlFor={ `ingredient-${index}` }
            data-testid={ `${index}-ingredient-step` }
            style={ checkedIngredients
              .includes(ingredient) ? { textDecoration: 'line-through' } : {} }
          >
            <input
              type="checkbox"
              id={ `ingredient-${index}` }
              onChange={ () => onIngredientCheck(ingredient) }
              checked={ checkedIngredients.includes(ingredient) }
            />
            {ingredient}
          </label>
        </div>
      ))}
    </ul>
  );
}

export default IngredientsList;
