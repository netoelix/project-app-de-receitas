import { useEffect, useState } from 'react';
import CardRecipe from '../Components/CardRecipe';
import NavFilter from '../Components/NavFilter';
import { MockDoneRecipes } from '../Utils/Mock';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(MockDoneRecipes);
  useEffect(() => {
    const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    if (storageDoneRecipes) setDoneRecipes(storageDoneRecipes);
  }, []);

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
