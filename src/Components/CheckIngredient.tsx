import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './CheckIngredient.css';

type CheckboxProps = {
  ingredient: string;
  index:number
};

function CheckIngredient({ ingredient, index } : CheckboxProps) {
  const { register, getValues } = useForm();
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={ (checked ? 'marked' : '') }
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ ingredient }
    >
      <input
        type="checkbox"
        id={ ingredient }
        { ...register('checkbox', { onChange: () => setChecked(getValues('checkbox')),
        }) }
      />
      {ingredient}
    </label>
  );
}

export default CheckIngredient;
