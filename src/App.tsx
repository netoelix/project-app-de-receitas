import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Layout from './layout/Layout';
import Profile from './Pages/Profile';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';
import RecipeInProgress from './Pages/RecipeInProgress';
import RecipeDetails from './Pages/RecipeDetails';
import Home from './Pages/Home';
// import LoadingPage from './Pages/Loading';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/home" element={ <Home /> } />
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
        <Route path="/:type/:id" element={ <RecipeDetails /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/profile" element={ <Profile /> } />
        {/* <Route path="/loading" element={ <LoadingPage /> } /> */}
      </Route>
    </Routes>
  );
}

export default App;
