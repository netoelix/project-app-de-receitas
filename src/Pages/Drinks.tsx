import { useContext, useEffect } from 'react';
import { store } from '../Context/StoreContext';
import Footer from '../Components/Footer';

function Drinks() {
  const { HandleFood } = useContext(store);
  useEffect(() => {
    HandleFood('drinks');
  }, [HandleFood]);

  return (
    <>
      <h1> Pagina de Drinks </h1>
      <Footer />
    </>
  );
}

export default Drinks;
