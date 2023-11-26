import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';

describe('Testes da página DoneRecipes', () => {
  it('Testa se o header é devidamente renderizado', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    const header = screen.getByTestId('page-title');
    expect(header).toHaveTextContent('Done Recipes');
  });
});
