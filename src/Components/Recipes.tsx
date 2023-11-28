import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesType } from '../Utils/Types';
import StoreContext from '../Context/StoreContext';

export default function Recipes({ title, recipes, categories }: RecipesType) {
  const { categorieSelected, clearFilter } = useContext(StoreContext);
  const titlePath = `${title.charAt(0).toLocaleLowerCase()}${title.slice(1)}`;

  return (
    <div>
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
          <Link to={ `/${titlePath}/:${recipe[`id${title}`]}` }>
            <img
              src={ recipe[`str${title}Thumb`] }
              alt={ recipe[`str${title}`] }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }>{recipe[`str${title}`]}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}
