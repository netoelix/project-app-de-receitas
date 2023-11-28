const createUrlFood = (food: string, action : string, input : string) => {
  const url = (food === 'drinks') ? (
    'https://www.thecocktaildb.com/api/json/v1/1/') : (
    'https://www.themealdb.com/api/json/v1/1/');
  switch (action) {
    case 'firstLetter':
    {
      const newUrl = `${url}search.php?f=${input}`;
      return newUrl;
    }
    case 'ingredient':
    {
      const newUrl = `${url}filter.php?i=${input}`;
      return newUrl;
    }

    default:
    { return `${url}search.php?s=${input}`; }
  }
};

export const requestApi = async (food: string, action : string, input : string) => {
  const url = createUrlFood(food, action, input);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
