function SmallDealResponse(Food: string, List: string[]) {
  switch (Food) {
    case 'drinks':
    {
      const newlist = List.map((recipe : any) => {
        return {
          id: recipe.idDrink,
          type: 'drink',
          image: recipe.strDrinkThumb,
          name: recipe.strDrink,
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
        };
      });
      return newlist;
    }
  }
}

export default SmallDealResponse;
