export type FoodCardType = {
  id:string
  type:string
  nationality:string
  category:string
  alcoholicOrNot?: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
};

export type StorageType = {
  email: string,
  doneRecipes: FoodCardType[],
  favoriteRecipes: FoodCardType[],
  inProgressRecipes: {
    drinks: string,
    meals: string,
  },
};

export type StoreContextType = {
  handleFood : (page : string) => void,
  handleDoneRecipes : (filter : string) => void,
  handleFavorites: (filter : string) => void,
  handleScreen : (filter : string, string: FoodCardType[]) => void,
  storeRecipes : StorageType,
  food : string,
  recipesScreen: FoodCardType[],
  removeFavorites: (recipe : string) => void,
  recipes: FoodCardType[],
  handleRecipes: (newRecipes: FoodCardType[]) => void,
};

export type CardRecipe = {
  id: string,
  type: string,
  image: string,
  name: string,
  category: string,
  nationality: string,
  tags: string[],
  doneDate: string,
  instructions: string
  ingredients: string[],
};

export type CardRecipeProps = {
  food : FoodCardType
  page: string
  index: number
};

export type NavProps = {
  page: string;
};

export type CategoryType = {
  strCategory: string,
};
