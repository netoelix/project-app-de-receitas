import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

describe('Testes da página DoneRecipes', () => {
  it('Testa se o header é devidamente renderizado', () => {
    renderWithRouterAndProvider(<App />, { route: '/done-recipes' });
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
    screen.getByText('Spicy Arrabiata Penne');

  });
});
