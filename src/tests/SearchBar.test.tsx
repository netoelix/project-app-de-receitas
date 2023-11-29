import { getByText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

describe('Testes do componente Search Bar', () => {
  it('Verifica se ao digitar mais de uma letra e selecionar o radiobutton "First letter" e clicar para procurar uma mensagem aparece na tela', async () => {
    const { user } = renderWithRouterAndProvider(<App />, { route: '/meals' });
    const topBtnSearch = screen.getByTestId('search-top-btn');
    await user.click(topBtnSearch);

    const execSearchBtn = screen.getByTestId('exec-search-btn');
    const input = screen.getByTestId('search-input');
    // const ingredientRadioBtn = screen.getByTestId('ingredient-search-radio');
    // const nameRadioBtn = screen.getByTestId('name-search-radio');
    const firstLetterRadioBtn = screen.getByTestId('first-letter-search-radio');

    await user.type(input, 'abc');
    await user.click(firstLetterRadioBtn);
    await user.click(execSearchBtn);

    const alertText = screen.findByText('Your search must have only 1 (one) character');

    expect(alertText).toBeInTheDocument();
  });
});
