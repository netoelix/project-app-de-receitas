import { useContext } from 'react';
import CardRecipe from '../Components/CardRecipe';
import NavFilter from '../Components/NavFilter';
import { store } from '../Context/StoreContext';
import { DoneRecipesContainer, Paragraph } from '../styles/StyledDoneRecipes';
import StoreContext from '../Context/StoreContext';

function DoneRecipes() {
  const { storeRecipes: { doneRecipes } } = useContext(StoreContext);

  const ElementDoneRecipes = (
    <DoneRecipesContainer>
      {doneRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="DoneRecipes" />
      ))}
    </DoneRecipesContainer>
  );

  return (
    <main>
      <NavFilter page="DoneRecipes" />
      <div>
        {doneRecipes.length === 0 && <Paragraph>Nenhuma receita feita</Paragraph>}
        {doneRecipes.length > 0 && ElementDoneRecipes}
      </div>
    </main>
  );
}

export default DoneRecipes;
