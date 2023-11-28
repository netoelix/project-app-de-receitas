import { useContext } from 'react';
import StoreContext from '../Context/StoreContext';
import { NavProps } from '../Utils/Types';

function NavFilter({ Page } : NavProps) {
  const { handleDoneRecipes, handleFavorites } = useContext(StoreContext);

  function setFilter(filter: string) {
    if (Page === 'Favorite') return handleFavorites(filter);
    if (Page === 'DoneRecipes') return handleDoneRecipes(filter);
  }

  return (
    <nav>
      <button onClick={ () => setFilter('all') } data-testid="filter-by-all-btn">
        All
      </button>

      <button onClick={ () => setFilter('meal') } data-testid="filter-by-meal-btn">
        Food
      </button>
      <button onClick={ () => setFilter('drink') } data-testid="filter-by-drink-btn">
        Drinks
      </button>
    </nav>
  );
}
export default NavFilter;
