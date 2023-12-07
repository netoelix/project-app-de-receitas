import { useNavigate } from 'react-router-dom';
import { requestApi } from '../Utils/ApiRequest';
import DealResponse from '../Utils/DealResponse';
import { RandomButton } from '../styles/StyledHeader';

function RandomRecipe() {
  const navigate = useNavigate();

  const stortRecipe = async () => {
    const food = window.location.pathname.split('/')[1];
    const recipe = await requestApi(food, 'random', '');
    const deal = DealResponse(food, await recipe[food]);
    const { id } = deal[0];
    console.log(deal[0].id);
    navigate(`/${food}/${id}`);
  };

  return (
    <RandomButton onClick={ () => stortRecipe() }>
      Surprise me
    </RandomButton>
  );
}

export default RandomRecipe;
