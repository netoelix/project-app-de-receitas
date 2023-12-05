import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { StyledHeader, HeaderContainer } from '../styles/StyledHeader';
import { logoRecipesApp, profileIcon,
  receipIcon, searchIcon } from '../Utils/exportIcons';

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
    const pathSplit = path.split('/');

    switch (pathSplit[1]) {
      case 'drinks':
        setTitle('Drinks');
        break;
      case 'profile':
        setTitle('Profile');
        setShowSearchIcon(false);
        break;

      case 'done-recipes':
        setTitle('Done Recipes');
        setShowSearchIcon(false);
        break;

      case 'favorite-recipes':
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

        <img src={ receipIcon } alt="" />
        <img src={ logoRecipesApp } alt="" />

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
