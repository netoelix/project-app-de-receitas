import { createContext } from 'react';
import { StorageType } from '../Utils/Types';

type StoreContextProps = {
  Food : string
  HandleFood : (page : string) => void
  HandleDoneRecipes : (Filter : string) => void
  HandleFavorites: (Filter : string) => void
  storeRecipes : StorageType
  RemoveFavorites: (Recipe : string) => void
};

export const store = createContext({} as StoreContextProps);
