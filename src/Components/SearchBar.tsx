import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { requestApi } from '../Utils/ApiRequest';
import { CustomInputRadio, InputRadiosContainer, SearchConteinerBar, SearchInput } from '../styles/StyledHeader';
import StoreContext from '../Context/StoreContext';
import { FoodCardType } from '../Utils/Types';
import DealResponse from '../Utils/DealResponse';

function SearchBar() {
  const { food, handleRecipes } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const { searchInput, radioSearch } = getValues();

    if (radioSearch === 'firstLetter' && searchInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    } else {
      const response = await requestApi(food, radioSearch, searchInput);

      if (response[food] === null) {
        window.alert('Sorry, we haven\'t found any recipes for these filters');
      } else if (response[food]) {
        const result = response[food].slice(0, 12);
        const newList :FoodCardType[] = DealResponse(food, result);
        if (newList.length === 1) {
          navigate(`/${food}/${newList[0].id}`);
        } else {
          handleRecipes(newList);
        }
      }
    }
  };

  const { register, getValues } = useForm();

  return (

    <SearchConteinerBar>
      <SearchInput
        type="text-area"
        data-testid="search-input"
        placeholder="Search"
        { ...register('searchInput') }
      />
      <InputRadiosContainer>
        <CustomInputRadio>
          <input
            type="radio"
            id="ingredient"
            value="ingredient"
            { ...register('radioSearch') }
            data-testid="ingredient-search-radio"
          />
          <label htmlFor="ingredient">
            Ingredient
          </label>
        </CustomInputRadio>
        <CustomInputRadio>
          <input
            type="radio"
            id="name"
            value="name"
            { ...register('radioSearch') }
            data-testid="name-search-radio"
          />
          <label htmlFor="name">
            Name
          </label>
        </CustomInputRadio>
        <CustomInputRadio>
          <input
            type="radio"
            id="firstLetter"
            value="firstLetter"
            { ...register('radioSearch') }
            data-testid="first-letter-search-radio"
          />
          <label htmlFor="firstLetter">
            First letter
          </label>
        </CustomInputRadio>
      </InputRadiosContainer>

      <button onClick={ handleSearch } data-testid="exec-search-btn">Search</button>
    </SearchConteinerBar>

  );
}

export default SearchBar;
