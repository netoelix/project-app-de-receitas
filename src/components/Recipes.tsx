import { useContext } from 'react';
import { RecipesType } from '../types';
import Context from '../context/Context';

export default function Recipes({ title, recipes, categories }: RecipesType) {
  const { categorieSelected, clearFilter } = useContext(Context);

  return (
    <div>
      <h2>{`${title}s`}</h2>
      {categories.slice(0, 5).map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ index }
          onClick={ () => categorieSelected(strCategory, title) }
        >
          {strCategory}

        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ () => clearFilter(title) }
      >
        All

      </button>
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
