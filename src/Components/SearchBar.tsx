import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { requestApi } from '../Utils/ApiRequest';
import StoreContext from '../Context/StoreContext';

function SearchBar() {
  const { food } = useContext(StoreContext);
  const [data, setData] = useState([{}] as any);

  const handleSearch = async () => {
    const { searchInput, radioSearch } = getValues();
    const resultApi = requestApi(food, radioSearch, searchInput);
    if (radioSearch === 'firstLetter' && searchInput.length > 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    setData(resultApi);
    console.log(await resultApi);

    console.log(getValues());
  };

  const { register, getValues } = useForm();

  return (

    <div>
      <input
        type="text-area"
        data-testid="search-input"
        { ...register('searchInput') }

      />

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

      <button onClick={ handleSearch } data-testid="exec-search-btn">Search</button>
    </div>

  );
}

export default SearchBar;
