import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

describe('Testes do componente Search Bar', () => {
  it('Verifica se ao digitar mais de uma letra e selecionar o radiobutton "First letter" e clicar para procurar uma mensagem aparece na tela', async () => {
    const { user } = renderWithRouterAndProvider(<App />, { route: '/meals' });
    const topBtnSearch = screen.getByTestId('search-top-btn');
    await user.click(topBtnSearch);

    const execSearchBtn = screen.getByTestId('exec-search-btn');
    const input = screen.getByTestId('search-input');
    const firstLetterRadioBtn = screen.getByTestId('first-letter-search-radio');

    await user.type(input, 'abc');
    await user.click(firstLetterRadioBtn);
    await user.click(execSearchBtn);

    const alertText = screen.findByText('Your search must have only 1 (one) character');

    expect(alertText).toBeInTheDocument();
  });
  it('É renderizado um alert ao tentar procurar uma receita pela primeira letra com 2 digitos ou mais no input', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ meals: null, drinks: null }),
      ok: true,
    } as Response);
    vi.spyOn(global, 'alert');

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
  it('É renderizado um alert ao tentar procurar uma receita pelo ingrediente e não retornar nenhuma', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ meals: null, drinks: null }),
      ok: true,
    } as Response);
    vi.spyOn(global, 'alert');

    renderWithRouterAndProvider(<App />, { route: '/meals' });
    const searchBtn = screen.getByTestId('search-top-btn');
    await userEvent.click(searchBtn);
    const input = screen.getByTestId('search-input');
    const checkbox = screen.getByTestId('ingredient-search-radio');
    const submit = screen.getByTestId('exec-search-btn');

    await userEvent.type(input, 'fish');
    await userEvent.click(checkbox);
    await userEvent.click(submit);

    expect(global.alert).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters');
  });
});
