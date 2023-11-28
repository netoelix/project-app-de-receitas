export type FoodCardType = {
  id:string
  type:string
  nationality:string
  category:string
  alcoholicOrNot: string,
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

export type MealsType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
};

export type DrinksType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
};

export type StrCategoryType = {
  strCategory: string,
};

export type RecipesType = {
  title: string,
  recipes: MealsType[] | DrinksType[],
  categories: StrCategoryType[],
};

export type StoreProviderProps = {
  children: React.ReactNode;
};

export type StoreContextType = {
  food : string,
  handleFood : (page : string) => void,
  handleDoneRecipes : (filter : string) => void,
  handleFavorites: (filter : string) => void,
  storeRecipes : StorageType,
  removeFavorites: (recipe : string) => void,
  meals: MealsType[],
  drinks: DrinksType[],
  mealsCategories: StrCategoryType[],
  drinksCategories: StrCategoryType[],
  categorieSelected: (categorie: string, type: string) => void,
  clearFilter: (type: string) => void,
};

export type CardRecipeProps = {
  food : FoodCardType
  page: string
  index: number
};

export type NavProps = {
  page: string;
};
