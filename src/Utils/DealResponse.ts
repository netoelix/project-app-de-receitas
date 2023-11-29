function DealResponse(Food: string, List: string[]) {
  switch (Food) {
    case 'drinks':
    {
      const newlist = List.map((recipe : any) => {
        return {
          id: recipe.idDrink,
          type: 'drinks',
          image: recipe.strDrinkThumb,
          name: recipe.strDrink,
          category: recipe.strCategory,
          nationality: recipe.strArea,
          tags: recipe.strTags,
          alcoholicOrNot: recipe.strAlcoholic,
          doneDate: '',
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
          tags: recipe.strTags,
          alcoholicOrNot: recipe.strAlcoholic,
          doneDate: '',
        };
      });
      return newlist;
    }
  }
}

export default DealResponse;
