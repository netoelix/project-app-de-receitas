import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import RecipesText from '../images/logo Recipes app.svg';
import Logo from '../images/ícone Recipes app.svg';
import { StyledHeader, HeaderContainer } from '../styles/StyledHeader';

function Header() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleButtonSearch = () => {
    return !showSearchBar ? setShowSearchBar(true) : setShowSearchBar(false);
  };

  useEffect(() => {
    const path = (window.location.pathname);
    switch (path) {
      case '/drinks':
        setTitle('Drinks');
        break;
      case '/profile':
        setTitle('Profile');
        setShowSearchIcon(false);
        break;

      case '/done-recipes':
        setTitle('Done Recipes');
        setShowSearchIcon(false);
        break;

      case '/favorite-recipes':
        setTitle('Favorite Recipes');
        setShowSearchIcon(false);
        break;

      default:
        setTitle('Meals');
    }
  }, [title, navigate]);

  return (
    <>
      <StyledHeader>

        <img src={ Logo } alt="" />
        <img src={ RecipesText } alt="" />

        <button onClick={ handleProfileClick }>
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>

        {showSearchIcon && (
          <button onClick={ handleButtonSearch }>
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
        )}

      </StyledHeader>
      <HeaderContainer>
        <h1 data-testid="page-title">
          {title}
        </h1>

        {showSearchBar && (
          <SearchBar />
        )}
      </HeaderContainer>
    </>

  );
}

export default Header;
