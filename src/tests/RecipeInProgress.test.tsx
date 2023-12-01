import { vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { meals } from './mocks/mockIdResponse';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';
import App from '../App';

const route = '/meals/52978/in-progress';

describe('Testando a tela de receita em progresso', () => {
  test('Testando se a tela contém os elementos esperados', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);
    renderWithRouterAndProvider(<App />, { route });
    const title = await screen.findByTestId('recipe-title');
    expect(title).toHaveTextContent('Kumpir');
    const allIngredients = await screen.findAllByTestId(/-ingredient-step/);
    expect(allIngredients.length).toBe(6);
    expect(allIngredients[0]).toHaveTextContent('Potatoes');
    expect(global.fetch).toHaveBeenCalled();
    vi.clearAllMocks();
  });

  test('Testa se ao clicar em um checkbox, seu conteudo fica riscado', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);
    renderWithRouterAndProvider(<App />, { route });
    expect(await screen.findByRole('button', { name: 'Finalizar' })).toBeInTheDocument();
    const checkbox = screen.getByTestId('2-ingredient-step');
    expect(checkbox).not.toHaveClass('marked');
    await act(async () => {
      await userEvent.click(checkbox);
    });
    expect(checkbox).toHaveClass('marked');
    vi.clearAllMocks();
  });

  test('Testa se o botão de finalizar inicia desabilitado e ao selecionar-se todos os ingredientes ele é habilitado', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);
    renderWithRouterAndProvider(<App />, { route });
    expect(await screen.findByRole('button', { name: 'Finalizar' })).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(6);
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();
    await act(async () => {
      await userEvent.click(checkboxes[0]);
      await userEvent.click(checkboxes[1]);
      await userEvent.click(checkboxes[2]);
      await userEvent.click(checkboxes[3]);
      await userEvent.click(checkboxes[4]);
      await userEvent.click(checkboxes[5]);
    });

    const newFinishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(newFinishBtn).not.toBeDisabled();
    vi.clearAllMocks();
  });
});
