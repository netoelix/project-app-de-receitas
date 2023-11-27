import { RecipesType } from '../types';

export default function Recipes({ title, recipes, categories }: RecipesType) {
  return (
    <div>
      <h2>{`${title}s`}</h2>
      {categories.slice(0, 5).map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ index }
        >
          {strCategory}

        </button>
      ))}
      {recipes.slice(0, 12).map((recipe, index) => (
        <div key={ recipe[`id${title}`] } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe[`str${title}Thumb`] }
            alt={ recipe[`str${title}`] }
            data-testid={ `${index}-card-img` }
          />
          <h4 data-testid={ `${index}-card-name` }>{recipe[`str${title}`]}</h4>
        </div>
      ))}
    </div>
  );
}
