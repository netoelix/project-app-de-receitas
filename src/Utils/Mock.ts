const date = '23/06/2020';

export const MockDoneRecipes = [{
  id: '52903',
  type: 'meal',
  nationality: 'French',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'French Onion Soup',
  image: 'https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg',
  doneDate: date,
  tags: ['Soup', 'Vegetarian'],
}];

export const MockDoneRecipes2 = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: date,
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: date,
    tags: [],
  },
];

export const MockProvider = {
  Food: 'meal',
  HandleFood: () => {},
  doneRecipes: MockDoneRecipes2,
  HandleDoneRecipes: () => {},
};
