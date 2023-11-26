import { useContext, useEffect } from 'react';
import { store } from '../Context/StoreContext';

function Meals() {
  const { HandleFood } = useContext(store);
  useEffect(() => {
    HandleFood('meals');
  }, [HandleFood]);

  return (
    <h5>conteudo pagina meals</h5>
  );
}

export default Meals;
