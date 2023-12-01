import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';
import fetchTrybe from '../../cypress/mocks/fetch';

const handlesearch = 'search-top-btn';
const handleInput = 'search-input';
const handleSubmit = 'exec-search-btn';

describe('Testes do componente Search Bar', () => {
  test('É renderizado um alert ao tentar procurar um pela primeira letra com 2 digitos ou mais no input', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ meals: null, drinks: null }),
      ok: true,
    } as Response);
    vi.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouterAndProvider(<App />, { route: '/meals' });
    const searchBtn = screen.getByTestId(handlesearch);
    await userEvent.click(searchBtn);
    const input = screen.getByTestId(handleInput);
    const checkbox = screen.getByTestId('first-letter-search-radio');
    const submit = screen.getByTestId(handleSubmit);

    await userEvent.type(input, 'a');
    await userEvent.click(checkbox);
    await userEvent.click(submit);

    await userEvent.type(input, 'ab');
    await userEvent.click(submit);

    expect(global.alert).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  afterEach(() => { vi.restoreAllMocks(); });
  test('É renderizado um alert ao tentar procurar um produto por um ingrediente que não existe.', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchTrybe);

    vi.spyOn(window, 'alert').mockImplementation(() => {});
    // window.alert = vi.fn(() => {});
    renderWithRouterAndProvider(<App />, { route: '/meals' });
    const handleSearch = screen.getByTestId(handlesearch);
    await userEvent.click(handleSearch);

    const submit = screen.getByTestId(handleSubmit);
    const ingredientFilter = screen.getByTestId('name-search-radio');
    const input = screen.getByTestId(handleInput);

    await userEvent.type(input, 'xablau');
    await userEvent.click(ingredientFilter);

    await userEvent.click(submit);
    expect(global.alert).toHaveBeenCalled();
  });
  test('Teste para apenas um resultado', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(fetchTrybe);
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouterAndProvider(<App />, { route: '/meals' });
    const handleSearch = screen.getByTestId(handlesearch);
    await userEvent.click(handleSearch);

    const submit = screen.getByTestId(handleSubmit);
    const Filter = screen.getByTestId('name-search-radio');
    const input = screen.getByTestId(handleInput);

    await userEvent.type(input, 'Arrabiata');
    await userEvent.click(Filter);

    await userEvent.click(submit);
    expect(window.location.pathname).toBe('/meals/52771');
  });
});
