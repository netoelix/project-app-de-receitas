import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Layout from './layout/Layout';
import Drinks from './Pages/Drinks';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import StoreProvider from './Context/StoreProvider';

function App() {
  const { meals, drinks, mealsCategories, drinksCategories } = useContext(Context);
  return (
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Layout /> }>
          <Route path="/meals" element={ <Recipes
          recipes={ meals }
          categories={ mealsCategories }
          title="Meal"/> } />
          <Route path="/drinks" element={ <Recipes
          recipes={ drinks }
          categories={ drinksCategories }
          title="Drink"
        /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        </Route>
      </Routes>
  );
}

export default App;
