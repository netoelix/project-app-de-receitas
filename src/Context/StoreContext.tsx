import { createContext } from 'react';
import { FavoritesCardType, FoodCardType } from '../Utils/Types';

type StoreContextProps = {
  Food : string
  HandleFood : (page : string) => void
  doneRecipes : FoodCardType[]
  HandleDoneRecipes : (Filter : string) => void
  favoriteRecipes : FavoritesCardType[]
  HandleFavorites: (Filter : string) => void
};

export const store = createContext({} as StoreContextProps);
