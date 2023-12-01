import { vi } from 'vitest';
import { screen } from '@testing-library/react';
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
    const recipePhoto = screen.getByTestId('recipe-title');
    expect(recipePhoto).toBeInTheDocument();
    expect(recipePhoto.innerText).toBe('Kumpir');
    expect(global.fetch).toHaveBeenCalled();
  });
});
