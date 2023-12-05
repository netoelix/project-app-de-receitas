import { useContext, useEffect, useState } from 'react';
import NavFilter from '../Components/NavFilter';
import CardRecipe from '../Components/CardRecipe';
import StoreContext from '../Context/StoreContext';
import { FoodCardType } from '../Utils/Types';

function FavoriteRecipes() {
  // const { storeRecipes: { favoriteRecipes } } = useContext(StoreContext);
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
    <div>
      <NavFilter page="Favorite" />
      {favoriteRecipes.length === 0 && <p>Nenhuma receita favoritada</p>}
      {favoriteRecipes.length > 0 && showByFavFilter
        ? FilteredFavRecipes : ElementFavRecipes}
    </div>
  );
}

export default FavoriteRecipes;
