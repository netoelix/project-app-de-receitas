import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Recipes from './components/Recipes';
import Context from './context/Context';

function App() {
  const { meals, drinks, mealsCategories, drinksCategories } = useContext(Context);
  return (
    <Routes>
      <Route
        path="/meals"
        element={ <Recipes
          recipes={ meals }
          categories={ mealsCategories }
          title="Meal"
        /> }
      />
      <Route
        path="/drinks"
        element={ <Recipes
          recipes={ drinks }
          categories={ drinksCategories }
          title="Drink"
        /> }
      />
    </Routes>
  );
}

export default App;
