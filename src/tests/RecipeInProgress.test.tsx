import { vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { meals } from './mocks/mockIdResponse';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';
import App from '../App';

const route = '/meals/52978/in-progress';
const favBtnTestId = 'favorite-btn';

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

    fireEvent.click(checkbox);

    expect(checkbox).toHaveClass('marked');
  });

  test('Testa se o botão de finalizar inicia desabilitado e ao selecionar-se todos os ingredientes ele é habilitado e ao clicá-lo a receita é adicionada ao localStorage e a página é redirecionada para /done-recipes', async () => {
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
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    fireEvent.click(checkboxes[2]);
    fireEvent.click(checkboxes[2]);
    fireEvent.click(checkboxes[3]);
    fireEvent.click(checkboxes[4]);
    fireEvent.click(checkboxes[5]);
    // screen.debug();
    const newFinishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(newFinishBtn).not.toBeDisabled();

    fireEvent.click(newFinishBtn);

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toHaveLength(1);

    const doneRecipesTitle = screen.getByText('Done Recipes');

    expect(doneRecipesTitle).toBeInTheDocument();
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('Se o botão de favoritar inicia com o coração vazio e ao clicá-lo muda para preenchido', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);

    renderWithRouterAndProvider(<App />, { route });

    expect(await screen.findByTestId(favBtnTestId)).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    fireEvent.click(screen.getByTestId(favBtnTestId));

    expect(screen.getByTestId(favBtnTestId)).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('Se o botão de favoritar inicia com o coração preenchido caso a receita já tenha sido favoritada anteriormente', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);

    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      alcoholicOrNot: '',
      category: 'Side',
      id: '52978',
      image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
      name: 'Kumpir',
      nationality: 'Turkish',
      type: 'meal',
    }]));

    renderWithRouterAndProvider(<App />, { route });

    expect(await screen.findByTestId(favBtnTestId)).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');

    fireEvent.click(screen.getByTestId(favBtnTestId));

    expect(screen.getByTestId(favBtnTestId)).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');

    localStorage.clear();
  });

  test('Se ao clicar no botão de compartilhar o link é copiado e uma mensagem aparece', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ meals }),
      ok: true,
    } as Response);

    renderWithRouterAndProvider(<App />, { route });

    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();

    expect(screen.getByTestId('message')).toHaveTextContent('');

    fireEvent.click(screen.getByTestId('share-btn'));

    expect(screen.getByTestId('message')).toHaveTextContent('Link copied!');
  });
});
