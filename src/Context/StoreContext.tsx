import { createContext } from 'react';
import { StoreContextType } from '../Utils/Types';

const StoreContext = createContext({} as StoreContextType);

export default StoreContext;
