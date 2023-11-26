import { useContext } from 'react';
import { store } from '../Context/StoreContext';

function NavFilter() {
  const { HandleDoneRecipes } = useContext(store);

  function setFilter(filter: string) {
    HandleDoneRecipes(filter);
  }

  return (
    <nav>
      <button onClick={ () => setFilter('All') } data-testid="filter-by-all-btn">
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
