import { useContext, useEffect } from 'react';
import StoreContext from '../Context/StoreContext';

function Meals() {
  const { handleFood } = useContext(StoreContext);
  useEffect(() => {
    handleFood('meals');
  }, [handleFood]);

  return (
    <h5>conteudo pagina meals</h5>
  );
}

export default Meals;
