import { NavLink } from 'react-router-dom';
import { FooterContainerHome, HomeContainer } from '../styles/StyledHome';
import { allFoodIcon, drinkIcon } from '../Utils/exportIcons';

function Home() {
  return (
    <>
      <HomeContainer>
        <NavLink to="/meals">
          <button type="button" data-testid="explore-food">
            <img src={ allFoodIcon } alt="" />
            Explore Foods
          </button>
        </NavLink>
        <NavLink to="/drinks">
          <button type="button" data-testid="explore-drinks">
            <img src={ drinkIcon } alt="" />
            Explore Drinks
          </button>
        </NavLink>
      </HomeContainer>
      <FooterContainerHome />
    </>
  );
}
export default Home;
