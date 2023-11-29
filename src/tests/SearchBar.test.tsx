import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';
import fetchTrybe from '../../cypress/mocks/fetch';

describe('Testes do componente Search Bar', () => {
  test('É renderizado um alert ao tentar procurar um pela primeira letra com 2 digitos ou mais no input', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ meals: null, drinks: null }),
      ok: true,
    } as Response);
    vi.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouterAndProvider(<App />, { route: '/meals' });
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);
    const input = screen.getByTestId('search-input');
    const checkbox = screen.getByTestId('first-letter-search-radio');
    const submit = screen.getByTestId('exec-search-btn');

    await userEvent.type(input, 'a');
    await userEvent.click(checkbox);
    await userEvent.click(submit);

    await userEvent.type(input, 'ab');
    await userEvent.click(submit);

    expect(global.alert).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  afterEach(() => { vi.restoreAllMocks(); });
  test.only('É renderizado um alert ao tentar procurar um produto por um ingrediente que não existe.', async () => {
    vi.spyOn(global, 'fetch').mockImplementationOnce(fetchTrybe);

    vi.spyOn(window, 'alert').mockImplementation(() => {});
    // window.alert = vi.fn(() => {});
    renderWithRouterAndProvider(<App />, { route: '/meals' });
    const handleSearch = screen.getByTestId('search-top-btn');
    await userEvent.click(handleSearch);

    const submit = screen.getByTestId('exec-search-btn');
    const ingredientFilter = screen.getByTestId('ingredient-search-radio');
    const input = screen.getByTestId('search-input');

    await userEvent.type(input, 'xablau');
    await userEvent.click(ingredientFilter);

    await userEvent.click(submit);
    expect(global.alert).toHaveBeenCalled();
  });
});
