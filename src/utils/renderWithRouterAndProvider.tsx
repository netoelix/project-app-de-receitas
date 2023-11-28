import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ContextProvider from '../context/ContextProvider';

function renderWithRouterAndProvider(ui: JSX.Element, { route = '/' } = {}) {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(
      <ContextProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </ContextProvider>,
    ),
  };
}

export default renderWithRouterAndProvider;
