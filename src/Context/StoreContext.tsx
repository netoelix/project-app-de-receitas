import { createContext } from 'react';

type StoreContextProps = {
  Food : string
  HandleFood : (page : string) => void
};

export const store = createContext({} as StoreContextProps);
