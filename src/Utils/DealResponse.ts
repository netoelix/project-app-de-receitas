import processIngredients from './processIngredients';
import processTags from './processTags';

function DealResponse(Food: string, List: string[]) {
  switch (Food) {
    case 'drinks':
    {
      const newlist = List.map((recipe : any) => {
        return {
          id: recipe.idDrink,
          type: 'drink',
          image: recipe.strDrinkThumb,
          name: recipe.strDrink,
          category: recipe.strCategory,
          nationality: recipe.strArea,
          tags: processTags(recipe.strTags),
          alcoholicOrNot: recipe.strAlcoholic,
          doneDate: '',
          instructions: recipe.strInstructions,
          ingredients: processIngredients(recipe, 15),
        };
      });
      return newlist;
    }
    default:
    {
      const newlist = List.map((recipe : any) => {
        return {
          id: recipe.idMeal,
          type: 'meal',
          image: recipe.strMealThumb,
          name: recipe.strMeal,
          category: recipe.strCategory,
          nationality: recipe.strArea,
          tags: processTags(recipe.strTags),
          alcoholicOrNot: '',
          doneDate: '',
          instructions: recipe.strInstructions,
          ingredients: processIngredients(recipe, 20),
        };
      });
      return newlist;
    }
  }
}

export default DealResponse;
