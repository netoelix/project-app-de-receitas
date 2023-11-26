import { FoodCardType } from '../Utils/Types';
import shareIcon from '../images/shareIcon.svg';

type CardRecipeProps = {
  Food : FoodCardType
  Page: string
  index: number
};
// drink: Foto, Nome, AlcoholicOrNot, DoneDate,Share
// meal : Foto, Nome, Category, DoneDate ,Tags ,Share
// CardPadrão :Foto,Nome,DoneDate ,Share [AlcholoicOrNot | [Category,Tags]]

function CardRecipe({ Food, Page, index } : CardRecipeProps) {
  const { image, name, nationality, category, tags, doneDate, type } = Food;
  const dataTest = `${index}-horizontal-`;
  return (
    <div>
      <div className="Img">
        <img src={ image } alt="food" width="150px" data-testid={ `${dataTest}image` } />
      </div>
      <div className="Recipe-Info">
        <h1 data-testid={ `${dataTest}name` }>{name}</h1>
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

      <button className="Btns-Card">
        <img data-testid={ `${dataTest}share-btn` } src={ shareIcon } alt="share" />
      </button>
    </div>
  );
}

export default CardRecipe;
