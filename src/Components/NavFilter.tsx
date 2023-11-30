import { useContext } from 'react';
import { store } from '../Context/StoreContext';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import allFoodIcon from '../images/allFoodIcon.svg';
import { NavFilterContainer } from '../styles/StyledDoneRecipes';

function NavFilter() {
  const { HandleDoneRecipes } = useContext(store);

  function setFilter(filter: string) {
    HandleDoneRecipes(filter);
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
