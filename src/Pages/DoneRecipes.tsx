import { useContext, useEffect, useState } from 'react';
import CardRecipe from '../Components/CardRecipe';
import NavFilter from '../Components/NavFilter';
import { DoneRecipesContainer, Paragraph } from '../styles/StyledDoneRecipes';
import StoreContext from '../Context/StoreContext';

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
    <DoneRecipesContainer>
      {doneRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="DoneRecipes" />
      ))}
    </DoneRecipesContainer>
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
<<<<<<< HEAD
        {doneRecipes.length === 0 && <p>Nenhuma receita feita</p>}
        {doneRecipes.length > 0 && showByDoneFilter
          ? FilteredDoneRecipes : ElementDoneRecipes}
=======
        {doneRecipes.length === 0 && <Paragraph>Nenhuma receita feita</Paragraph>}
        {doneRecipes.length > 0 && ElementDoneRecipes}
>>>>>>> 60f01fee8919bbb7e31368a678b2ceaac51721f0
      </div>
    </main>
  );
}

export default DoneRecipes;
