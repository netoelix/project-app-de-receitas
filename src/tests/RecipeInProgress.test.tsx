import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { meals } from './mocks/mockIdResponse';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';
import App from '../App';

describe('Testando a tela de receita em progresso', () => {
  test('Testando se a tela contém os elementos esperados', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);
    renderWithRouterAndProvider(<App />, { route: '/meals/52978/in-progress' });
    const title = await screen.findByTestId('recipe-title');
    expect(title).toHaveTextContent('Kumpir');
    const allIngredients = await screen.findAllByTestId(/-ingredient-step/);
    expect(allIngredients.length).toBe(6);
    expect(allIngredients[0]).toHaveTextContent('Potatoes');
    expect(global.fetch).toHaveBeenCalled();
  });

  test('Testa se ao clicar em um checkbox, seu contepudo fica riscado', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);
    renderWithRouterAndProvider(<App />, { route: '/meals/52978/in-progress' });
    const checkbox = await screen.findByTestId('2-ingredient-step');
    expect(checkbox).not.toHaveClass('marked');
    await userEvent.click(checkbox);
    expect(checkbox).toHaveClass('marked');
  });
});
