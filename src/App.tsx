import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Recipes from './components/Recipes';

function App() {
  return (
    <Routes>
      <Route path="/meals" element={ <Recipes recipesType="meals" /> } />
      <Route path="/drinks" element={ <Recipes recipesType="drinks" /> } />
    </Routes>
  );
}

export default App;
