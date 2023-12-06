import { requestApi } from './ApiRequest';

async function categoryFoods(type: string, category: string) {
  const response = await requestApi(type, 'category-data', category);

  if (response[type]) {
    const result = response[type].slice(0, 12);
    if (type === 'meals') {
      const newList = result.map((element) => {
        return {
          name: element.strMeal,
          image: element.strMealThumb,
          id: element.idMeal,
          type: 'meal',
          category: '',
          nationality: '',
          tags: [],
          alcoholicOrNot: '',
          doneDate: '',
          instructions: '',
          ingredients: [],
        };
      });
      return newList;
    }
    const newList = result.map((element) => {
      return {
        name: element.strDrink,
        image: element.strDrinkThumb,
        id: element.idDrink,
        type: 'drink',
        category: '',
        nationality: '',
        tags: [],
        alcoholicOrNot: '',
        doneDate: '',
        instructions: '',
        ingredients: [],
      };
    });
    return newList;
  }
}

export default categoryFoods;
