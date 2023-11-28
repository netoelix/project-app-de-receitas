import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from '../Utils/renderWithRouter';

describe('Testes da página de Login', () => {
  it('Verifica se o input de email e senha estão na tela.', () => {
    renderWithRouter(<App />, { route: '/' });
    screen.getByTestId('email-input');
    screen.getByTestId('password-input');
  });
  it('Verifica se ao inserir um email e senha válidos a rota é mudada ao clickar no botão login', async () => {
    renderWithRouter(<App />, { route: '/' });
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    await userEvent.type(email, 'edward@gmail.com');
    await userEvent.type(password, '14528963');
    await userEvent.click(btnLogin);

    screen.getByTestId('page-title');
  });
});
