import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

describe('Testes da página DoneRecipes', () => {
  it('Testa se o header é devidamente renderizado', () => {
    renderWithRouterAndProvider(<App />, { route: '/done-recipes' });
    const header = screen.getByTestId('page-title');
    expect(header).toHaveTextContent('Done Recipes');
  });
  it('Testa se os cards de cada receitas são renderizados corretamente', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Beef',
      id: '53069',
      image: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
      name: 'Bistek',
      nationality: 'Filipino',
      type: 'meal',
      tags: [],
      doneDate: new Date(),
    }]));
    renderWithRouterAndProvider(<App />, { route: '/done-recipes' });
    expect(screen.getByText('Bistek')).toBeInTheDocument();
  });
  it('Testa se ao aplicar um filtro os cards das receitas são renderizados corretamente', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Beef',
      id: '53069',
      image: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
      name: 'Bistek',
      nationality: 'Filipino',
      type: 'meal',
      tags: [],
      doneDate: new Date(),
    },
    {
      alcoholicOrNot: 'Alcoholic',
      category: 'Cocktail',
      id: '17222',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      name: 'A1',
      nationality: '',
      type: 'drink',
      tags: [],
      doneDate: new Date(),
    }]));
    renderWithRouterAndProvider(<App />, { route: '/done-recipes' });
    const bistek = screen.getByText('Bistek');
    const A1 = screen.getByText('A1');
    expect(bistek).toBeInTheDocument();
    expect(A1).toBeInTheDocument();

    const filterByFoodBtn = screen.getByTestId('filter-by-meal-btn');

    fireEvent.click(filterByFoodBtn);

    expect(bistek).toBeInTheDocument();
    expect(A1).not.toBeInTheDocument();
  });
});
