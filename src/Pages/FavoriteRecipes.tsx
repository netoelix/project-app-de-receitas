import { useContext, useEffect, useState } from 'react';
import NavFilter from '../Components/NavFilter';
import CardRecipe from '../Components/CardRecipe';
import StoreContext from '../Context/StoreContext';
import { FoodCardType } from '../Utils/Types';
import { StyledFavoriteRecipes } from '../styles/StyledFavoriteRecipes';
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
    <div>
      {
      favoriteRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="Favorite" />
      ))
}
    </div>
  );

  const FilteredFavRecipes = (
    <div>
      {
      filteredFavRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="Favorite" />
      ))
}
    </div>
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
