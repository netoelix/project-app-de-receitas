import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import StoreProvider from '../Context/StoreProvider';

export const renderWithRouterAndProvider = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(
      <StoreProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </StoreProvider>,
    ),
  };
};
