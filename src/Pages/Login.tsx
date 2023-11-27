import { useForm } from 'react-hook-form';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { requestApi } from '../Utils/ApiRequest';

function Login() {
  const { register, getValues, handleSubmit, formState: { isValid } } = useForm();
  const navigate = useNavigate();

  const handleButtonEnter = () => {
    const { email } = getValues();
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  };

  async function teste() {
    console.log(await requestApi('', 'firstLetter', 'E'));
  }
  teste();

  return (
    <div>

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

    </div>

  );
}

export default Login;