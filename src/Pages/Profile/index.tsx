import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

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
    <div className="profile-container">
      <div className="profile-info">
        <h2>User Profile</h2>
        <p data-testid="profile-email" className="user-email">{email}</p>
      </div>
      <div className="profile-buttons">
        <button data-testid="profile-done-btn" onClick={ handleDoneRecipesClick }>
          Done Recipes
        </button>
        <button data-testid="profile-favorite-btn" onClick={ handleFavoriteRecipesClick }>
          Favorite Recipes
        </button>
        <button data-testid="profile-logout-btn" onClick={ handleLogoutClick }>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
