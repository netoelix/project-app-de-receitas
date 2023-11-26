import { FoodCardType } from '../Utils/Types';

type CardRecipeProps = {
  Food : FoodCardType
  Page: string
  index: number
};

function CardRecipe({ Food, Page, index } : CardRecipeProps) {
  const { image, name, nationality, category, tags } = Food;
  const dataTest = `${index}-horizontal-`;
  return (
    <div>
      <div className="Img">
        <img src={ image } alt="food" width="150px" data-testid={ `${dataTest}image` } />
      </div>
      <div className="Recipe-Info">
        <h1 data-testid={ `${dataTest}name` }>{name}</h1>
        <p data-testid={ `${dataTest}top-text` }>{`${nationality}-${category}`}</p>
      </div>
      <div className="Done-Info">
        {(Page === 'DoneRecipes') && (
          <p data-testid={ `${dataTest}done-date` }>
            Done-Date
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
      <div className="Btns-Card">
        <button data-testid={ `${dataTest}share-btn` }>Share</button>
      </div>
    </div>
  );
}

export default CardRecipe;
