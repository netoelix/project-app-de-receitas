import { useContext } from 'react';
import CardRecipe from '../Components/CardRecipe';
import NavFilter from '../Components/NavFilter';
import { store } from '../Context/StoreContext';
import { DoneRecipesContainer, Paragraph } from '../styles/StyledDoneRecipes';

function DoneRecipes() {
  const { doneRecipes } = useContext(store);

  const ElementDoneRecipes = (
    <DoneRecipesContainer>
      {doneRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } Food={ recipe } Page="DoneRecipes" />
      ))}
    </DoneRecipesContainer>
  );

  return (
    <main>
      <NavFilter />
      <div>
        {doneRecipes.length === 0 && <Paragraph>Nenhuma receita feita</Paragraph>}
        {doneRecipes.length > 0 && ElementDoneRecipes}
      </div>
    </main>
  );
}

export default DoneRecipes;
