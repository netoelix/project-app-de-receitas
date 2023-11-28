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
