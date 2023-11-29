import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProvider } from '../Utils/renderWithRouterAndProvider';
import App from '../App';
import { mockResponseMeal } from './mocks/mockResponseMeal';

const cardTestId = '0-card-name';

describe('Recipes Component', () => {
  test('renders without errors', async () => {
    afterEach(() => vi.clearAllMocks());
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ json: () => Promise.resolve({ results: mockResponseMeal }) } as Response);
    const mock = mockResponseMeal;
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mock,
    } as Response;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    renderWithRouterAndProvider(<App />, { route: '/meals' });
    // Assert that the component renders without throwing any errors
    // 20-25
    const firstCard = await screen.findByTestId('0-recipe-card');
    const firstFilter = await screen.findByTestId('Seafood-category-filter');
    const allbtn = await screen.findByTestId('All-category-filter');
    expect(firstCard).toBeInTheDocument();
    expect(firstFilter).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(4);
    await userEvent.click(firstFilter);
    const newfirstCard = await screen.findByTestId(cardTestId);
    expect(newfirstCard.innerHTML).toBe('Corba');

    await userEvent.click(firstFilter);
    const resetFirst = await screen.findByTestId(cardTestId);
    expect(resetFirst.innerHTML).toBe('Corba');

    await userEvent.click(allbtn);
    const resultAll = await screen.findByTestId(cardTestId);
    expect(resultAll.innerHTML).toBe('Corba');
  });
});
