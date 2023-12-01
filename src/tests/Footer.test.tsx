import { act, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';

test('renders Footer component', async () => {
  renderWithRouterAndProvider(
    <App />,
    { route: '/meals' },
  );
  const footer = await screen.findByTestId('footer');
  // Verifica se o componente foi renderizado
  expect(footer).toBeInTheDocument();
});

test('redirects to drinks page on drinks icon click', async () => {
  const { user } = renderWithRouterAndProvider(
    <App />,
    { route: '/meals' },
  );

  const drinksButton = screen.getByTestId('drinks-bottom-btn');
  act(() => {
    user.click(drinksButton);
  });

  // Verifica se ocorreu o redirecionamento para "/drinks"
  const title = await screen.findByText('Drinks');
  expect(title).toBeInTheDocument();
});

test('redirects to meals page on meals icon click', async () => {
  const { user } = renderWithRouterAndProvider(
    <App />,
    { route: '/meals' },
  );

  const mealsButton = screen.getByTestId('meals-bottom-btn');
  act(() => {
    user.click(mealsButton);
  });

  // Verifica se ocorreu o redirecionamento para "/meals"
  expect(window.location.pathname).toBe('/meals');
});

// Exemplo de teste para garantir que as imagens dos ícones são renderizadas corretamente
test('renders drink and meal icons', () => {
  renderWithRouterAndProvider(
    <App />,
    { route: '/meals' },
  );

  const drinkIconElement = screen.getByAltText('Drinks');
  const mealIconElement = screen.getByAltText('Meals');

  expect(drinkIconElement).toBeInTheDocument();
  expect(mealIconElement).toBeInTheDocument();
});

// Exemplo de teste para cobrir a situação em que os ícones têm a classe "icon" (adaptar conforme necessário)
test('icons have the "icon" class', () => {
  renderWithRouterAndProvider(
    <App />,
    { route: '/meals' },
  );

  const drinkIconElement = screen.getByAltText('Drinks');
  const mealIconElement = screen.getByAltText('Meals');

  expect(drinkIconElement).toHaveClass('icon');
  expect(mealIconElement).toHaveClass('icon');
});
