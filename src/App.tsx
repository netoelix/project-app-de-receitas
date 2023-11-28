import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Login from './Pages/Login';
import Layout from './layout/Layout';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import StoreContext from './Context/StoreContext';
import Recipes from './Components/Recipes';

function App() {
  const { meals, drinks, mealsCategories, drinksCategories } = useContext(StoreContext);
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
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
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
