import { useContext } from 'react';
import CardRecipe from '../Components/CardRecipe';
import NavFilter from '../Components/NavFilter';
import { store } from '../Context/StoreContext';

function DoneRecipes() {
  const { doneRecipes } = useContext(store);

  const ElementDoneRecipes = (
    <div>
      {doneRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } Food={ recipe } Page="DoneRecipes" />
      ))}
    </div>
  );

  return (
    <main>
      <NavFilter />
      <div>
        {doneRecipes.length === 0 && <p>Nenhuma receita feita</p>}
        {doneRecipes.length > 0 && ElementDoneRecipes}
      </div>
    </main>
  );
}

export default DoneRecipes;
