import { useContext, useEffect } from 'react';
import StoreContext from '../Context/StoreContext';

function Drinks() {
  const { handleFood } = useContext(StoreContext);
  useEffect(() => {
    handleFood('drinks');
  }, [handleFood]);

  return <h1> Pagina de Drinks </h1>;
}

export default Drinks;
