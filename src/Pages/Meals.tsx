import { useContext, useEffect } from 'react';
import StoreContext from '../Context/StoreContext';

function Meals() {
  const { HandleFood } = useContext(StoreContext);
  useEffect(() => {
    HandleFood('meals');
  }, [HandleFood]);

  return (
    <h5>conteudo pagina meals</h5>
  );
}

export default Meals;
