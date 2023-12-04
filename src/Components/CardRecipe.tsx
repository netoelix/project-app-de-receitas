import { useContext, useState } from 'react';
import { CardRecipeProps } from '../Utils/Types';
import { CardRecipeContainer,
  CardRecipeImage, CardRecipeInfo, TagContainer } from '../styles/StyledDoneRecipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import StoreContext from '../Context/StoreContext';
import { shareIcon } from '../Utils/exportIcons';

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

  const share = (
    <img data-testid={ `${dataTest}share-btn` } src={ shareIcon } alt="share" />
  );
  const favBtn = (
    <button onClick={ () => removeFavorites(name) }>
      <img
        data-testid={ `${dataTest}favorite-btn` }
        src={ blackHeartIcon }
        alt="fav"
      />
    </button>
  );

  return (
    <CardRecipeContainer data-testid={ `${index}-recipe-card` }>
      <div className="Img">
        <a href={ link }>
          <CardRecipeImage
            src={ image }
            alt="food"
            data-testid={ testIdImg }
          />
        </a>
      </div>
      <CardRecipeInfo>
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

          <TagContainer className="Tags">
            {(page === 'DoneRecipes') && tags.map((tagName) => {
              const dataTestTag = `${index}-${tagName}-horizontal-tag`;
              return (
                <p key={ tagName } data-testid={ dataTestTag }>
                  {tagName}
                </p>
              );
            })}
          </TagContainer>
        </div>
      </CardRecipeInfo>
      <button onClick={ () => copyToClipBoard() }>
        {copied ? 'Link copied!' : share}
      </button>
      {(page === 'Favorite') && (favBtn)}
    </CardRecipeContainer>
  );
}

export default CardRecipe;
