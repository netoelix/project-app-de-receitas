import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { StyledFooter } from '../styles/StyledFooter';
import { drinkIcon, mealIcon } from '../Utils/exportIcons';

function Footer() {
  const location = useLocation();

  return (
    <StyledFooter data-testid="footer" className="footer">
      {location.pathname !== '/home' && (
        <>
          {/* Link para a página de bebidas */}
          <Link to="/drinks">
            <img
              src={ drinkIcon }
              alt="Drinks"
              data-testid="drinks-bottom-btn"
              className="icon"
            />
          </Link>

          <Link to="/home">
            <p>HOME</p>
          </Link>

          {/* Link para a página de comidas */}
          <Link to="/meals">
            <img
              src={ mealIcon }
              alt="Meals"
              data-testid="meals-bottom-btn"
              className="icon"
            />
          </Link>
        </>
      )}
    </StyledFooter>
  );
}

export default Footer;
