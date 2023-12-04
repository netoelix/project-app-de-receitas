import { useContext, useEffect, useState } from 'react';
import CardRecipe from '../Components/CardRecipe';
import NavFilter from '../Components/NavFilter';
import StoreContext from '../Context/StoreContext';
import { FoodCardType } from '../Utils/Types';

function DoneRecipes() {
  // const { storeRecipes: { doneRecipes } } = useContext(StoreContext);
  const { filteredDoneRecipes, showByDoneFilter } = useContext(StoreContext);
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')
    || JSON.stringify([]));
    setDoneRecipes(doneRecipesStorage);
  }, []);

  const ElementDoneRecipes = (
    <div>
      {doneRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="DoneRecipes" />
      ))}
    </div>
  );

  const FilteredDoneRecipes = (
    <div>
      {filteredDoneRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="DoneRecipes" />
      ))}
    </div>
  );

  return (
    <main>
      <NavFilter page="DoneRecipes" />
      <div>
        {doneRecipes.length === 0 && <p>Nenhuma receita feita</p>}
        {doneRecipes.length > 0 && showByDoneFilter
          ? FilteredDoneRecipes : ElementDoneRecipes}
      </div>
    </main>
  );
}

export default DoneRecipes;
