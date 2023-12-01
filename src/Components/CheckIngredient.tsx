import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './CheckIngredient.css';

type CheckboxProps = {
  ingredient: string,
  index:number,
  type: string,
  id: number,
  handleFinishRecipeBtn: () => void,
};

function CheckIngredient({
  ingredient, index, type, id, handleFinishRecipeBtn } : CheckboxProps) {
  const { register, getValues } = useForm();
  const [checked, setChecked] = useState();

  useEffect(() => {
    const inProgressLocalStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes') as string,
    );
    setChecked(inProgressLocalStorage[type][id].some(
      (element: number) => element === index,
    ));
  }, [id, index, type]);

  const handleChange = () => {
    setChecked(getValues('checkbox'));
    const inProgressLocalStorage = JSON.parse(
      localStorage.getItem('inProgressRecipes') as string,
    );
    if (inProgressLocalStorage[type][id].includes(index)) {
      const newArray = inProgressLocalStorage[type][id].filter(
        (element: number) => element !== index,
      );
      inProgressLocalStorage[type][id] = newArray;
    } else {
      inProgressLocalStorage[type][id].push(index);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressLocalStorage));
    handleFinishRecipeBtn();
  };

  return (
    <label
      className={ (checked ? 'marked' : '') }
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ ingredient }
    >
      <input
        type="checkbox"
        id={ ingredient }
        { ...register('checkbox', { onChange: () => handleChange(),
        }) }
        checked={ checked }
      />
      {ingredient}
    </label>
  );
}

export default CheckIngredient;
