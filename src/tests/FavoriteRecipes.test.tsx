import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

describe('Testes da página FavoriteRecipes', () => {
  it('Testa se o header é devidamente renderizado', () => {
    renderWithRouterAndProvider(<App />, { route: '/favorite-recipes' });
    const header = screen.getByTestId('page-title');
    expect(header).toHaveTextContent('Favorite Recipes');
  });
  it('Testa se os cards de cada receitas são renderizados corretamente', () => {
    renderWithRouterAndProvider(<App />, { route: '/favorite-recipes' });
    screen.getByText('Spicy Arrabiata Penne');
    screen.getByTestId('0-horizontal-favorite-btn');
  });
});
