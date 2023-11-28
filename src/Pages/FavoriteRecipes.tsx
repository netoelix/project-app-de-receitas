import { useContext } from 'react';
import NavFilter from '../Components/NavFilter';
import CardRecipe from '../Components/CardRecipe';
import StoreContext from '../Context/StoreContext';

function FavoriteRecipes() {
  const { storeRecipes: { favoriteRecipes } } = useContext(StoreContext);

  const ElementFavRecipes = (
    <div>
      {
      favoriteRecipes.length > 0 && favoriteRecipes.map((recipe, index) => (
        <CardRecipe index={ index } key={ index } food={ recipe } page="Favorite" />
      ))
}
    </div>
  );
  return (
    <div>
      <NavFilter page="Favorite" />
      {favoriteRecipes.length > 0 && ElementFavRecipes}
    </div>
  );
}

export default FavoriteRecipes;
