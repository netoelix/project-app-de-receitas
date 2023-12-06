import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { StyledHeader, HeaderContainer } from '../styles/StyledHeader';
import {
  logoRecipesApp, profileIcon,
  receipIcon, searchIcon,
  mealIcon, drinkIcon, logoIcon, doneIcon,
  favoriteIcon, profileYellowIcon } from '../Utils/exportIcons';

function Header() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [pageIcon, setPageIcon] = useState(mealIcon);
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
      case 'meals':
        setTitle('Meals');
        setShowSearchIcon(true);
        setPageIcon(mealIcon);
        break;
      case 'drinks':
        setTitle('Drinks');
        setShowSearchIcon(true);
        setPageIcon(drinkIcon);
        break;
      case 'profile':
        setTitle('Profile');
        setShowSearchIcon(false);
        setPageIcon(profileYellowIcon);
        break;

      case 'done-recipes':
        setTitle('Done Recipes');
        setShowSearchIcon(false);
        setPageIcon(doneIcon);
        break;

      case 'favorite-recipes':
        setTitle('Favorite Recipes');
        setShowSearchIcon(false);
        setPageIcon(favoriteIcon);
        break;

      default:
        setTitle('Home');
        setShowSearchIcon(false);
        setPageIcon(logoIcon);
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
        <img src={ pageIcon } alt="Title Icon" className="image-header" />
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
