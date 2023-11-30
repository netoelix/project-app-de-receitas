import { useContext, useEffect } from 'react';
import StoreContext from '../Context/StoreContext';
import Recipes from '../Components/Recipes';

function Meals() {
  const { handleFood } = useContext(StoreContext);
  useEffect(() => {
    handleFood('meals');
  }, [handleFood]);

  return (
    <Recipes />
  );
}

export default Meals;
