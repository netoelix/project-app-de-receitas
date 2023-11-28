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
import RecipeInProgress from './Pages/RecipeInProgress';

function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Layout /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        </Route>
      </Routes>
    </StoreProvider>
  );
}

export default App;
