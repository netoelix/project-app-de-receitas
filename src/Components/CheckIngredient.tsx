type CheckboxProps = {
  ingredient: string;
  index:number
};

function CheckIngredient({ ingredient, index } : CheckboxProps) {
  return (
    <label data-testid={ `${index}-ingredient-step` } htmlFor={ ingredient }>
      <input type="checkbox" id={ ingredient } />
      {ingredient}
    </label>
  );
}

export default CheckIngredient;
