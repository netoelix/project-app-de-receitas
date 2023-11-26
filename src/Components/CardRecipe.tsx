import { useState } from 'react';
import { FoodCardType } from '../Utils/Types';
import shareIcon from '../images/shareIcon.svg';

type CardRecipeProps = {
  Food : FoodCardType
  Page: string
  index: number
};

function CardRecipe({ Food, Page, index } : CardRecipeProps) {
  const [copied, setCopied] = useState(false);
  const { image, name, nationality, category, tags, doneDate, type, id } = Food;
  const dataTest = `${index}-horizontal-`;
  const link = `http://localhost:3000/${type}s/${id}`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  const share = (
    <img data-testid={ `${dataTest}share-btn` } src={ shareIcon } alt="share" />
  );

  return (
    <div>
      <div className="Img">
        <a href={ link }>
          <img
            src={ image }
            alt="food"
            width="150px"
            data-testid={ `${dataTest}image` }
          />
        </a>
      </div>
      <div className="Recipe-Info">
        <a href={ link }>
          <h1 data-testid={ `${dataTest}name` }>{name}</h1>
        </a>
        {(type === 'meal') && (
          <p data-testid={ `${dataTest}top-text` }>{`${nationality} - ${category}`}</p>
        )}
        {(type === 'drink') && (
          <p data-testid={ `${dataTest}top-text` }>{Food.alcoholicOrNot}</p>
        )}

      </div>

      <div className="Done-Info">
        {(Page === 'DoneRecipes') && (
          <p data-testid={ `${dataTest}done-date` }>
            {doneDate}
          </p>)}

        <div className="Tags">
          {tags.map((tagName) => {
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
    </div>
  );
}

export default CardRecipe;
