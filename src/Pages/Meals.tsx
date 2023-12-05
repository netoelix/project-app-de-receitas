import { useContext, useEffect } from 'react';
import Footer from '../Components/Footer';
import StoreContext from '../Context/StoreContext';
import Recipes from '../Components/Recipes';

function Meals() {
  const { handleFood } = useContext(StoreContext);
  useEffect(() => {
    handleFood('meals');
  }, [handleFood]);

  return (
    <>
      <h5>conteudo pagina meals</h5>
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
