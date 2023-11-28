import { createContext } from 'react';

type StoreContextProps = {
  Food : string
  HandleFood : (page : string) => void
  HandleDoneRecipes : (Filter : string) => void
  HandleFavorites: (Filter : string) => void
  storeRecipes : StorageType
  RemoveFavorites: (Recipe : string) => void
};

import { StoreContextType } from '../Utils/Types';

const StoreContext = createContext({} as StoreContextType);
        
export default StoreContext;
