import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/icone-bebida.svg';
import mealIcon from '../images/icone-prato.svg';
import { StyledFooter } from '../styles/StyledFooter';

function Footer() {
  return (
    <StyledFooter data-testid="footer" className="footer">
      {/* Link para a página de bebidas */}
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="Drinks"
          data-testid="drinks-bottom-btn"
          className="icon"
        />
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
      {/* <span>Trybe - todos os direitos reservados</span> */}
    </StyledFooter>
  );
}

export default Footer;
