export default async function filterByCategorie(categorie: string, type: string) {
  if (type === 'Meal') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
    const data = await response.json();

    return data.meals;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`);
  const data = await response.json();

  return data.drinks;
}
