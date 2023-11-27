import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import { mockFetch } from './mockFetch';
import renderWithRouterAndProvider from '../utils/renderWithRouterAndProvider';

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

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(5);

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

    const categoriesButtons = await screen.findAllByRole('button');
    expect(categoriesButtons).toHaveLength(5);

    const drinksCardsImgs = await screen.findAllByRole('img');
    expect(drinksCardsImgs).toHaveLength(12);
    const drinksCardsNames = await screen.findAllByRole('heading', { level: 4 });
    expect(drinksCardsNames).toHaveLength(12);
    expect(drinksCardsNames[0]).toHaveTextContent('A1');
    expect(drinksCardsNames[11]).toHaveTextContent('B-52');
  });
});
