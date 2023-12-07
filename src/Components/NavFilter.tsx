import { useContext } from 'react';
import { NavFilterContainer } from '../styles/StyledDoneRecipes';
import StoreContext from '../Context/StoreContext';
import { allFoodIcon, drinkIcon, mealIcon } from '../Utils/exportIcons';

type NavProps = {
  page: string;
};

function NavFilter({ page } : NavProps) {
  const { handleDoneRecipes, handleFavorites } = useContext(StoreContext);

  function setFilter(filter: string) {
    if (page === 'Favorite') return handleFavorites(filter);
    if (page === 'DoneRecipes') return handleDoneRecipes(filter);
  }

  return (
    <NavFilterContainer>
      <button onClick={ () => setFilter('All') } data-testid="filter-by-all-btn">
        <img src={ allFoodIcon } alt="" />
        All
      </button>

      <button onClick={ () => setFilter('meal') } data-testid="filter-by-meal-btn">
        <img src={ mealIcon } alt="" />
        Food
      </button>
      <button onClick={ () => setFilter('drink') } data-testid="filter-by-drink-btn">
        <img src={ drinkIcon } alt="" />
        Drinks
      </button>
    </NavFilterContainer>
  );
}
export default NavFilter;
