import { useContext } from 'react';
import CardRecipe from '../Components/CardRecipe';
import NavFilter from '../Components/NavFilter';
import StoreContext from '../Context/StoreContext';

function DoneRecipes() {
  const { storeRecipes: { doneRecipes } } = useContext(StoreContext);

  const ElementDoneRecipes = (
    <div>
      {doneRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="DoneRecipes" />
      ))}
    </div>
  );

  return (
    <main>
      <NavFilter page="DoneRecipes" />
      <div>
        {doneRecipes.length === 0 && <p>Nenhuma receita feita</p>}
        {doneRecipes.length > 0 && ElementDoneRecipes}
      </div>
    </main>
  );
}

export default DoneRecipes;
