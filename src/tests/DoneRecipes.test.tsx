import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';
import { store } from '../Context/StoreContext';
import { MockProvider } from '../Utils/Mock';

describe('Testes da página DoneRecipes', () => {
  it('Testa se o header é devidamente renderizado', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });
    const header = screen.getByTestId('page-title');
    expect(header).toHaveTextContent('Done Recipes');
  });
  it('Testa se os cards de cada receitas são renderizados corretamente', () => {
    const component = (
      <store.Provider value={ MockProvider }>
        <App />
      </store.Provider>
    );
    renderWithRouter(component, { route: '/done-recipes' });
    const cards = screen.getByText('Spicy Arrabiata Penne');
  });
});
