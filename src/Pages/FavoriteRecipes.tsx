import { useContext, useEffect, useState } from 'react';
import NavFilter from '../Components/NavFilter';
import CardRecipe from '../Components/CardRecipe';
import StoreContext from '../Context/StoreContext';
import { FoodCardType } from '../Utils/Types';
import { FavoriteContainer, StyledFavoriteRecipes } from '../styles/StyledFavoriteRecipes';
import { Paragraph } from '../styles/StyledDoneRecipes';

function FavoriteRecipes() {
  const { filteredFavRecipes, showByFavFilter } = useContext(StoreContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState<FoodCardType[]>([]);

  useEffect(() => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes')
    || JSON.stringify([]));
    setFavoriteRecipes(favoriteRecipesStorage);
  }, []);

  const ElementFavRecipes = (
    <FavoriteContainer>
      {
      favoriteRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="Favorite" />
      ))
}
    </FavoriteContainer>
  );

  const FilteredFavRecipes = (
    <FavoriteContainer>
      {
      filteredFavRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="Favorite" />
      ))
}
    </FavoriteContainer>
  );
  return (
    <StyledFavoriteRecipes>
      <div>
        <NavFilter page="Favorite" />
        {favoriteRecipes.length === 0
        && <Paragraph>Nenhuma receita favoritada</Paragraph>}
        {favoriteRecipes.length > 0 && showByFavFilter
          ? FilteredFavRecipes : ElementFavRecipes}
      </div>
    </StyledFavoriteRecipes>
  );
}

export default FavoriteRecipes;
