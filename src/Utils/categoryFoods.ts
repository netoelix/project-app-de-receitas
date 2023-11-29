import { requestApi } from './ApiRequest';
import DealResponse from './DealResponse';
import { FoodCardType } from './Types';

async function categoryFoods(type: string, category: string) {
  const response = await requestApi(type, 'category-data', category);
  if (response[type]) {
    const result = response[type].slice(0, 12);
    const newList :FoodCardType[] = DealResponse(type, result);

    return newList;
  }
}

export default categoryFoods;
