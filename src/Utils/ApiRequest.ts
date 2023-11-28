const createUrlFood = (type: string, action : string, input : string) => {
  const url = (type === 'drinks') ? (
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

export const requestApi = async (type: string, action : string, input : string) => {
  const url = createUrlFood(type, action, input);
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
