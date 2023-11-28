import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { mockFetch } from './mockFetch';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

describe('Testando a aplicação', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockImplementation(mockFetch as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Testando se a rota /meals inicia com um título, cinco categorias e uma lista das 12 primeiras receitas', async () => {
    renderWithRouterAndProvider(<App />, { route: '/meals' });

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');

    await waitFor(() => {
      expect(screen.getByText('Koshari')).toBeInTheDocument();
    });

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(6);

    const mealsCardsImgs = await screen.findAllByRole('img');
    expect(mealsCardsImgs).toHaveLength(12);
    const mealsCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(mealsCardsNames).toHaveLength(12);
    expect(mealsCardsNames[0]).toHaveTextContent('Corba');
    expect(mealsCardsNames[11]).toHaveTextContent('Koshari');
  });

  test('Testando se a rota /drinks inicia com um título, cinco categorias e uma lista das 12 primeiras receitas', async () => {
    renderWithRouterAndProvider(<App />, { route: '/drinks' });

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Drinks');

    await waitFor(() => {
      expect(screen.getByText('B-52')).toBeInTheDocument();
    });

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(6);

    const drinksCardsImgs = await screen.findAllByRole('img');
    expect(drinksCardsImgs).toHaveLength(12);
    const drinksCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(drinksCardsNames).toHaveLength(12);
    expect(drinksCardsNames[0]).toHaveTextContent('A1');
    expect(drinksCardsNames[11]).toHaveTextContent('B-52');
  });

  test('Testa na rota /meals se os botões de filtro funcionam e se o botão de limpar todos os filtros funciona', async () => {
    const { user } = renderWithRouterAndProvider(<App />, { route: '/meals' });

    await waitFor(() => {
      expect(screen.getByText('Koshari')).toBeInTheDocument();
    });

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(6);

    await user.click(categoriesButtons[0]);

    const mealsCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(mealsCardsNames[0]).toHaveTextContent('Beef and Mustard Pie');

    await user.click(categoriesButtons[5]);

    const newMealsCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(newMealsCardsNames[0]).toHaveTextContent('Corba');
  });

  test('Testa na rota /drinks se os botões de filtro funcionam e se o botão de limpar todos os filtros funciona', async () => {
    const { user } = renderWithRouterAndProvider(<App />, { route: '/drinks' });

    await waitFor(() => {
      expect(screen.getByText('A1')).toBeInTheDocument();
    });

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(6);

    await user.click(categoriesButtons[0]);

    const drinksCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(drinksCardsNames[0]).toHaveTextContent('3-Mile Long Island Iced Tea');

    await user.click(categoriesButtons[5]);

    const newDrinksCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(newDrinksCardsNames[0]).toHaveTextContent('A1');
  });

  test('Testa na rota /meals se ao clicar duas vezes no botão da mesma categoria as receitas sem filtro retornam', async () => {
    const { user } = renderWithRouterAndProvider(<App />, { route: '/meals' });

    await waitFor(() => {
      expect(screen.getByText('Koshari')).toBeInTheDocument();
    });

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(6);

    await user.click(categoriesButtons[0]);

    const mealsCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(mealsCardsNames[0]).toHaveTextContent('Beef and Mustard Pie');

    await user.click(categoriesButtons[0]);

    const newMealsCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(newMealsCardsNames[0]).toHaveTextContent('Corba');
  });

  test('Testa na rota /drinks se ao clicar duas vezes no botão da mesma categoria as receitas sem filtro retornam', async () => {
    const { user } = renderWithRouterAndProvider(<App />, { route: '/drinks' });

    await waitFor(() => {
      expect(screen.getByText('A1')).toBeInTheDocument();
    });

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(6);

    await user.click(categoriesButtons[0]);

    const drinksCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(drinksCardsNames[0]).toHaveTextContent('3-Mile Long Island Iced Tea');

    await user.click(categoriesButtons[0]);

    const newDrinksCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(newDrinksCardsNames[0]).toHaveTextContent('A1');
  });
});
