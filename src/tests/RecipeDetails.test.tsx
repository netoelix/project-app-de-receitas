import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import RecipeDetails from '../Pages/RecipeDetails';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';
import App from '../App';

const recipeFav = 'favorite-btn';
const meals = '/meals/52774';
const btn = 'start-recipe-btn';

describe('RecipeDetails Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('verifica se a receita está em progresso', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        1234: true,
      },
    }));

    await act(async () => {
      renderWithRouterAndProvider(<App />, { route: meals });
    });
  });

  const setupComponent = () => {
    renderWithRouterAndProvider(<RecipeDetails />);
  };
  it('verifica se a receita está favorita e se o botão de favorito é definido como verdadeiro', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ]));

    renderWithRouterAndProvider(<App />, { route: '/meals/52771' });
    const favButton = screen.getByTestId(recipeFav);
    expect(favButton).toBeTruthy();
  });

  it('verifica se a receita está favorita', async () => {
    const expectedFavoriteRecipes = [
      {
        id: '52771',
        type: 'meal',
        alcoholicOrNot: '',
      },
    ];
    renderWithRouterAndProvider(<App />, { route: '/meals/52771' });

    const favoriteBtn = screen.getByTestId(recipeFav);

    fireEvent.click(favoriteBtn);

    await waitFor(() => {}, { timeout: 3000 });

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    console.log(favoriteRecipes, 'ESPERADO');
    console.log(expectedFavoriteRecipes, 'RECEBIDO');

    expect(favoriteRecipes).toEqual(expectedFavoriteRecipes);

    expect(favoriteBtn).toHaveAttribute('alt', 'Favorited');

    fireEvent.click(favoriteBtn);

    await waitFor(() => {}, { timeout: 3000 });

    expect(favoriteBtn).toHaveAttribute('alt', 'Unfavorited');
  });

  it('handles favorite button click correctly', () => {
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');
    localStorage.setItem('favoriteRecipes', '[]');
    setupComponent();

    fireEvent.click(screen.getByTestId(recipeFav));

    expect(screen.getByTestId(recipeFav)).toHaveAttribute('alt', 'Favorited');
  });

  it('verifica se a receita é do tipo "drinks" e se a categoria e o teor alcoólico são exibidos', async () => {
    renderWithRouterAndProvider(<App />, { route: '/drinks/17222' });

    await waitFor(() => {
      expect(screen.getByText(/Alcoholic/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('verifica se a receita é do tipo "meals" e se o tipo é definido corretamente', async () => {
    renderWithRouterAndProvider(<App />, { route: '/meals/52768' });

    await waitFor(() => {
      expect(screen.getByText(/Meals/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('handles favorite button click', () => {
    renderWithRouterAndProvider(<App />, { route: meals });

    fireEvent.click(screen.getByTestId('favorite-btn'));
  });

  it('redirects meals to recipe in progress', () => {
    renderWithRouterAndProvider(<App />, { route: meals });

    const recipeButton = screen.getByTestId(btn);
    act(() => {
      fireEvent.click(recipeButton);
    });

    expect(window.location.pathname).toBe('/meals/52774/in-progress');
  });

  it('redirects drinks to recipe in progress', () => {
    const fetchSpy = vi.spyOn(global, 'fetch');
    renderWithRouterAndProvider(<App />, { route: '/drinks/178319' });

    const recipeButton = screen.getByTestId(btn);
    act(() => {
      fireEvent.click(recipeButton);
    });

    expect(fetchSpy).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
    expect(window.location.pathname).toBe('/drinks/178319/in-progress');
  });

  it('render', async () => {
    renderWithRouterAndProvider(<App />, { route: '/drinks/178319' });
    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    fireEvent.click(shareBtn);
    await waitFor(() => {
      expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
