import { createContext } from 'react';
import { StorageType } from '../Utils/Types';

type StoreContextProps = {
  Food : string
  HandleFood : (page : string) => void
  HandleDoneRecipes : (Filter : string) => void
  HandleFavorites: (Filter : string) => void
  storeRecipes : StorageType
};

export const store = createContext({} as StoreContextProps);
