// Recebe 1 array de objetos e 1 string e retorna uma array filtrada.
// A array de objetos deve ter o formato do tipo FoodCardType.
// A string deve ser uma das seguintes opções:
// 'All', 'Food', 'Drink'.
// A array retornada deve ter o formato do tipo FoodCardType.
// Se a string for 'All', retorna a array de objetos sem nenhum filtro.
// Se a string for 'Food', retorna a array de objetos com o filtro 'comida'.
// Se a string for 'Drink', retorna a array de objetos com o filtro 'bebida'.
// Se a array de objetos for vazia, retorna uma array vazia.
// Se a string for vazia, retorna a array de objetos sem nenhum filtro.

import { FoodCardType } from './Types';

// Se a string for diferente de 'All', 'Food' e 'Drink', retorna a array de objetos sem nenhum filtro.
export const filterRecipes = (Filter: string, List: FoodCardType[]) => {
  switch (Filter) {
    case 'meal':
    {
      const filteredList = List.filter((item) => item.type === 'meal');
      return filteredList;
    }
    case 'drink':
    {
      const filteredList = List.filter((item) => item.type === 'drink');
      return filteredList;
    }
    default:
      return List;
  }
};
