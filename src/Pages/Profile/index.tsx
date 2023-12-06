import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContainer } from '../../styles/StyledProfile';
import { doneIcon, exitIcon, favoriteIcon, profileYellowIcon } from '../../Utils/exportIcons';

function Profile() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.email) {
      setEmail(storedUser.email);
    }
  }, []);

  const handleDoneRecipesClick = () => {
    navigate('/done-recipes');
  };

  const handleFavoriteRecipesClick = () => {
    navigate('/favorite-recipes');
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <ProfileContainer className="profile-container">
      <div className="profile-info">
        <img src={ profileYellowIcon } alt="profile_picture" />
        <p data-testid="profile-email" className="user-email">{email}</p>
      </div>
      <div className="profile-buttons">
        <button data-testid="profile-done-btn" onClick={ handleDoneRecipesClick }>
          <img src={ doneIcon } alt="" />
          Done Recipes
        </button>
        <button data-testid="profile-favorite-btn" onClick={ handleFavoriteRecipesClick }>
          <img src={ favoriteIcon } alt="" />
          Favorite Recipes
        </button>
        <button data-testid="profile-logout-btn" onClick={ handleLogoutClick }>
          <img src={ exitIcon } alt="" />
          Logout
        </button>
      </div>
    </ProfileContainer>
  );
}

export default Profile;
