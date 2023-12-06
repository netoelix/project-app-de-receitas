export default function processIngredients(
  recipe: any,
  numberOfIngredients: number,
) {
  const allIngredients = [];
  for (let index = 1; index <= numberOfIngredients; index += 1) {
    if (recipe[`strIngredient${index}`] !== null
     && recipe[`strIngredient${index}`] !== undefined) {
      allIngredients.push(recipe[`strIngredient${index}`]);
    }
  }
  return allIngredients;
}
