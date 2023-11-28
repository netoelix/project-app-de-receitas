import { FoodCardType } from './Types';

// Se a string for diferente de 'All', 'Food' e 'Drink', retorna a array de objetos sem nenhum filtro.
export const filterRecipes = (Filter: string, List: FoodCardType[]) => {
  switch (Filter) {
    case 'meal':
    {
      console.log('teste');

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
