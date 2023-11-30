import { FoodCardType } from './Types';

export const filterRecipes = (Filter: string, List: FoodCardType[]) => {
  switch (Filter) {
    case 'meal':
    {
      const filteredList = List.filter((item) => item.type === 'meal');
      console.log(filteredList);

      return filteredList;
    }
    case 'drink':
    {
      const filteredList = List.filter((item) => item.type === 'drink');
      console.log(filteredList);

      return filteredList;
    }
    default:
      return List;
  }
};
