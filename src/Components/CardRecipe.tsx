import { useContext, useState } from 'react';
import { CardRecipeProps } from '../Utils/Types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import StoreContext from '../Context/StoreContext';
import styles from './CardRecipe.module.css';

function CardRecipe({ food, page, index } : CardRecipeProps) {
  const { removeFavorites } = useContext(StoreContext);
  const [copied, setCopied] = useState(false);
  const { image, name, nationality, category, tags, doneDate, type, id } = food;
  const dataTest = `${index}-horizontal-`;
  const link = `http://localhost:3000/${type}s/${id}`;

  const testIdName = (page === 'recipes') ? (`${index}-card-name`) : (`${dataTest}name`);
  const testIdImg = (page === 'recipes') ? (`${index}-card-img`) : (`${dataTest}image`);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  const handleFavorites = () => {
    removeFavorites(name);
    window.location.reload();
  };

  const share = (
    <img data-testid={ `${dataTest}share-btn` } src={ shareIcon } alt="share" />
  );
  const favBtn = (
    <button onClick={ () => handleFavorites() }>
      <img
        data-testid={ `${dataTest}favorite-btn` }
        src={ blackHeartIcon }
        alt="fav"
      />
    </button>
  );

  return (
    <div data-testid={ `${index}-recipe-card` } className={ styles.Card }>
      <div className="Img">
        <a href={ link }>
          <img
            src={ image }
            alt="food"
            width="150px"
            data-testid={ testIdImg }
          />
        </a>
      </div>
      <div className="Recipe-Info">
        <a href={ link }>
          <h1 data-testid={ testIdName }>{name}</h1>
        </a>
        {(type === 'meal') && (
          <p data-testid={ `${dataTest}top-text` }>{`${nationality} - ${category}`}</p>
        )}
        {(type === 'drink') && (
          <p data-testid={ `${dataTest}top-text` }>{food.alcoholicOrNot}</p>
        )}

      </div>

      <div className="Done-Info">
        {(page === 'DoneRecipes') && (
          <p data-testid={ `${dataTest}done-date` }>
            {doneDate}
          </p>)}

        <div className="Tags">
          {(page === 'DoneRecipes' && tags.length > 0) && tags.map((tagName) => {
            const dataTestTag = `${index}-${tagName}-horizontal-tag`;
            return (
              <p key={ tagName } data-testid={ dataTestTag }>
                {tagName}
              </p>
            );
          })}
        </div>
      </div>
      <button onClick={ () => copyToClipBoard() }>
        {copied ? 'Link copied!' : share}
      </button>
      {(page === 'Favorite') && (favBtn)}
    </div>
  );
}

export default CardRecipe;
