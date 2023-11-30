import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
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
      <span>Trybe - todos os direitos reservados</span>
    </footer>
  );
}

export default Footer;
