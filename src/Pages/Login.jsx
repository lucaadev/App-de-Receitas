import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/login.css';
import logo from '../images/logo.png';

function Login(props) {
  const [disable, setDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const btnValidation = () => {
    const MIN = 6;
    const valid = email.includes('@')
    && email.includes('.com')
    && password.length > (MIN);

    if (valid) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  useEffect(() => {
    btnValidation();
  });

  const handleSubmit = () => {
    const { history } = props;
    history.push('/foods');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div className="login">

      <form className="form">
        {/* <h1 className="titleLogin">Login</h1> */}

        <img src={ logo } alt="logo" className="picture" />
        <label htmlFor="email-input">
          <input
            className="inputEmail"
            data-testid="email-input"
            type="text"
            placeholder="Email"
            id="email-input"
            autoComplete="off"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          <input
            className="inputPassword"
            data-testid="password-input"
            type="password"
            placeholder="Password"
            id="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
        <button
          className="btnLogin"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disable }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
