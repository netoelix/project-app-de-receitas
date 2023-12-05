import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../Pages/Profile';

const USER_EMAIL = 'beTrybe@gmail.com';

const PROFILE_EMAIL_TEST_ID = 'profile-email';
const PROFILE_DONE_TEST_ID = 'profile-done-btn';
const PROFILE_FAVORITE_TEST_ID = 'profile-favorite-btn';
const PROFILE_LOGOUT_TEST_ID = 'profile-logout-btn';

const PROFILE_FAVORITE_TEXT = 'Favorite Recipes';

describe('Profile Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Profile />
      </Router>,
    );
  });

  it('renders a button with text "Done Recipes"', () => {
    const doneRecipesButton = screen.getByText('Done Recipes');
    expect(doneRecipesButton).toBeInTheDocument();
  });

  it('renders a button with text "Favorite Recipes"', () => {
    const favoriteRecipesButton = screen.getByText(PROFILE_FAVORITE_TEXT);
    expect(favoriteRecipesButton).toBeInTheDocument();
  });

  it('renders a button with text "Logout"', () => {
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  it('renders a button with data-testid "profile-done-btn"', () => {
    const doneRecipesButton = screen.getByTestId(PROFILE_DONE_TEST_ID);
    expect(doneRecipesButton).toBeInTheDocument();
  });

  it('renders a button with data-testid "profile-favorite-btn"', () => {
    const favoriteRecipesButton = screen.getByTestId(PROFILE_FAVORITE_TEST_ID);
    expect(favoriteRecipesButton).toBeInTheDocument();
  });

  it('renders a button with data-testid "profile-logout-btn"', () => {
    const logoutRecipesButton = screen.getByTestId(PROFILE_LOGOUT_TEST_ID);
    expect(logoutRecipesButton).toBeInTheDocument();
  });
  it('renders a <p> with data-testid "profile-email"', () => {
    const emailP = screen.getByTestId(PROFILE_EMAIL_TEST_ID);
    expect(emailP).toBeInTheDocument();
    expect(emailP.tagName).toBe('P');
  });

  it('renders a button with text "Favorite Recipes"', () => {
    const favoriteRecipesButton = screen.getByText(PROFILE_FAVORITE_TEXT);
    expect(favoriteRecipesButton).toBeInTheDocument();
  });

  it('renders a button with text "Logout"', () => {
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  it('redirects to Favorite Recipes page on clicking Favorite Recipes button', () => {
    const favoriteRecipesButton = screen.getByText(PROFILE_FAVORITE_TEXT);
    fireEvent.click(favoriteRecipesButton);

    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('clears localStorage and redirects to Login page on clicking Logout button', () => {
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(window.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('redirects to Done Recipes page on clicking Done Recipes button', () => {
    const doneRecipesButton = screen.getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesButton);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('redirects to Favorite Recipes page on clicking Favorite Recipes button', () => {
    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('redirects to Logout page on clicking Logout button', () => {
    const logoutButton = screen.getByTestId('profile-logout-btn');
    fireEvent.click(logoutButton);
    expect(window.location.pathname).toBe('/');
  });

  //

  it('retrieves and renders the stored email from localStorage', async () => {
    localStorage.setItem('user', JSON.stringify({ email: USER_EMAIL }));
    render(
      <Router>
        <Profile />
      </Router>,
    );

    const profileEmails = screen.queryAllByTestId(PROFILE_EMAIL_TEST_ID);

    let profileEmail: any;
    profileEmails.forEach((element) => {
      if (element.textContent === USER_EMAIL) {
        profileEmail = element;
      }
    });

    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail.textContent).toBe(USER_EMAIL);
  });
});
