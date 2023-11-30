import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Layout from './layout/Layout';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route
          path="/meals/:id/in-progress"
          element={ <RecipeInProgress /> }
        />
        <Route
          path="/drinks/:id/in-progress"
          element={ <RecipeInProgress /> }
        />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
