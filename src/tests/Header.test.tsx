import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

describe('Testes do componente Header', () => {
  it('Verifica se ao clicar  no icone de perfil é redirecionado para página de perfil', async () => {
    renderWithRouterAndProvider(<App />, { route: '/done-recipes' });
    const title = screen.getByTestId('page-title');
    const btnProfile = screen.getByTestId('profile-top-btn');

    expect(title.innerHTML).toBe('Done Recipes');

    await userEvent.click(btnProfile);
    const newTitle = screen.getByTestId('page-title');
    expect(newTitle.innerHTML).toBe('Profile');

    const btnSearch = screen.queryByTestId('search-top-btn');
    expect(btnSearch).toBe(null);
  });
  it('Verifica se o botão search funciona devidamente', async () => {
    renderWithRouterAndProvider(<App />, { route: '/drinks' });
    const btnSearch = screen.getByTestId('search-top-btn');
    await userEvent.click(btnSearch);
    screen.getByTestId('search-input');
    screen.getByTestId('ingredient-search-radio');
    screen.getByTestId('name-search-radio');
    screen.getByTestId('first-letter-search-radio');
  });
});
