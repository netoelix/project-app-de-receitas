import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { requestApi } from '../Utils/ApiRequest';
import { store } from '../Context/StoreContext';
import { SearchConteinerBar } from '../styles/StyledHeader';

function SearchBar() {
  const { Food } = useContext(store);
  const [data, setData] = useState([{}] as any);

  const handleSearch = async () => {
    const { searchInput, radioSearch } = getValues();
    const resultApi = requestApi(Food, radioSearch, searchInput);
    if (radioSearch === 'firstLetter' && searchInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    setData(resultApi);
    console.log(await resultApi);

    console.log(getValues());
  };

  const { register, getValues } = useForm();

  return (

    <SearchConteinerBar>
      <input
        type="text-area"
        data-testid="search-input"
        { ...register('searchInput') }
      />
      <div>

        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            value="ingredient"
            { ...register('radioSearch') }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            value="name"
            { ...register('radioSearch') }
            data-testid="name-search-radio"
          />

          Name
        </label>

        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            value="firstLetter"
            { ...register('radioSearch') }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </div>

      <button onClick={ handleSearch } data-testid="exec-search-btn">Search</button>
    </SearchConteinerBar>

  );
}

export default SearchBar;
