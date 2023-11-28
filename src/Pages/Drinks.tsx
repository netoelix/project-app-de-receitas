import { useContext, useEffect } from 'react';
import StoreContext from '../Context/StoreContext';

function Drinks() {
  const { HandleFood } = useContext(StoreContext);
  useEffect(() => {
    HandleFood('drinks');
  }, [HandleFood]);

  return <h1> Pagina de Drinks </h1>;
}

export default Drinks;
