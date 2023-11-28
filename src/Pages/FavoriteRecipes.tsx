import { useContext } from 'react';
import NavFilter from '../Components/NavFilter';
import { store } from '../Context/StoreContext';
import CardRecipe from '../Components/CardRecipe';

function FavoriteRecipes() {
  const { storeRecipes: { favoriteRecipes } } = useContext(store);
  console.log(favoriteRecipes);

  const ElementFavRecipes = (
    <div>
      {
      favoriteRecipes.length > 0 && favoriteRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } Food={ recipe } Page="Favorite" />
      ))
}
    </div>
  );
  return (
    <div>
      <NavFilter Page="Favorite" />
      {favoriteRecipes.length > 0 && ElementFavRecipes}
    </div>
  );
}

export default FavoriteRecipes;
