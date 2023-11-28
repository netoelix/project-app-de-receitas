import { useContext } from 'react';
import { store } from '../Context/StoreContext';

type NavProps = {
  Page: string;
};

function NavFilter({ Page } : NavProps) {
  const { HandleDoneRecipes, HandleFavorites } = useContext(store);

  function setFilter(filter: string) {
    if (Page === 'Favorite') return HandleFavorites(filter);
    if (Page === 'DoneRecipes') return HandleDoneRecipes(filter);
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
