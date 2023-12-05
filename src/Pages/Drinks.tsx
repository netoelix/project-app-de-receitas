import { useContext, useEffect } from 'react';
import StoreContext from '../Context/StoreContext';
import Recipes from '../Components/Recipes';

function Drinks() {
  const { handleFood } = useContext(StoreContext);
  useEffect(() => {
    handleFood('drinks');
  }, [handleFood]);

  return (
    <Recipes />
  );
}

export default Drinks;
