import { useForm } from 'react-hook-form';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { ContainerDiv, FooterContainer, LoginContainer } from '../styles/StyledLogin';
import { logoRecipesApp } from '../Utils/exportIcons';

function Login() {
  const { register, getValues, handleSubmit, formState: { isValid } } = useForm();
  const navigate = useNavigate();

  const handleButtonEnter = () => {
    const { email } = getValues();
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  };

  return (
    <>
      <ContainerDiv>
        <img src={ logoRecipesApp } alt="" />
      </ContainerDiv>
      <LoginContainer>
        <h1>LOGIN</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          { ...register(
            'email',
            { required: true, validate: (value) => validator.isEmail(value) },
          ) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          { ...register('password', { minLength: 7, required: true }) }
        />
        <button
          data-testid="login-submit-btn"
          onClick={ () => handleSubmit(handleButtonEnter)() }
          disabled={ !isValid }
        >
          Enter
        </button>
      </LoginContainer>
      <FooterContainer />
    </>

  );
}

export default Login;
