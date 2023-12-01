import { useContext, useEffect } from 'react';
import { store } from '../Context/StoreContext';
import Footer from '../Components/Footer';
import StoreContext from '../Context/StoreContext';
import Recipes from '../Components/Recipes';

function Drinks() {
  const { handleFood } = useContext(StoreContext);
  useEffect(() => {
    handleFood('drinks');
  }, [handleFood]);

  return (
    <>
      <h1> Pagina de Drinks </h1>
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
