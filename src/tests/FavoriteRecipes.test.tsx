import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';
import { store } from '../Context/StoreContext';
import { MockProvider } from '../Utils/Mock';

describe('Testes da página FavoriteRecipes', () => {
  it('Testa se o header é devidamente renderizado', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });
    const header = screen.getByTestId('page-title');
    expect(header).toHaveTextContent('FAVORITES');
  });
  it('Testa se os cards de cada receitas são renderizados corretamente', () => {
    const component = (
      <store.Provider value={ MockProvider }>
        <App />
      </store.Provider>
    );
    renderWithRouter(component, { route: '/favorite-recipes' });
    screen.getByText('Spicy Arrabiata Penne');
    screen.getByTestId('0-horizontal-favorite-btn');
  });
});
