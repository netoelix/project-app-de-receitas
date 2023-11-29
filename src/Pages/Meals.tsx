import { useContext, useEffect } from 'react';
import { store } from '../Context/StoreContext';
import Footer from '../Components/Footer';

function Meals() {
  const { HandleFood } = useContext(store);
  useEffect(() => {
    HandleFood('meals');
  }, [HandleFood]);

  return (
    <>
      <h5>conteudo pagina meals</h5>
      <Footer />
    </>
  );
}

export default Meals;
