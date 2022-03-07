import '../css/pages/register.css';
import '../css/components/form.css';
import '../css/components/button.css';

import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  emailInvalid: false,
  passwordMismatch: false,
  isButtonDisabled: true,
  helperText: '',
  isError: false,
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload
      };
    case 'setPasswordConfirm':
      return {
        ...state,
        passwordConfirm: action.payload
      }
    case 'passwordMismatch':
      return {
        ...state,
        passwordMismatch: action.payload,
      };
    case 'setEmail':
      return {
        ...state,
        email: action.payload
      }
    case 'emailInvalid':
      return {
        ...state,
        emailInvalid: action.payload
      }
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      }
    case 'registrationFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload
      };
  }
}

export default function Register() {
  console.log('register route rendered');
  const navigate = useNavigate();
  const auth = useAuth();

  const [state, dispatch] = useReducer(reducer, initialState);

  const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    if(
      state.username.trim() &&
      state.password.trim() &&
      state.passwordConfirm.trim() &&
      state.email.trim() && 
      !state.passwordMismatch &&
      !state.emailInvalid) {
        dispatch({
          type: 'setIsButtonDisabled',
          payload: false
        })
      } else {
        dispatch({
          type: 'setIsButtonDisabled',
          payload: true
        })
      }
  }, [
    state.username, 
    state.password,
    state.passwordConfirm,
    state.passwordMismatch,
    state.email,
    state.emailInvalid]);

  useEffect(() => {
    if(state.password === state.passwordConfirm) {
        dispatch({
          type: 'passwordMismatch',
          payload: false
        })
      } else {
        dispatch({
          type: 'passwordMismatch',
          payload: true
        })
      }
  }, [state.password, state.passwordConfirm]);

  useEffect(() => {
    if(state.email.match(validEmailRegex)) {
        dispatch({
          type: 'emailInvalid',
          payload: false
        })
      } else {
        dispatch({
          type: 'emailInvalid',
          payload: true
        })
      }
  }, [state.email]);

  const handleRegistration = () => {
    
    const credentials = {
      username: state.username,
      email: state.email,
      password: state.password,
      role: ['user', 'admin']
    }

    console.log(credentials);

    auth.register(credentials)
      .then(res => {
        console.log(res)
      },
      errorMessage => {
        dispatch({
          type: 'registrationFailed',
          payload: errorMessage,
        })
      });
  }

  const handleInput = (...args) => {
    dispatch({
      type: args[0],
      payload: args[1].target.value
    })
  }

  return (
    <section className="section-register">
      <div className="row">
        <div className="register">
          <div className="register__form">
          <h1>Registreer je account</h1>
            { state.isError ? <h2>{state.helperText}</h2> : '' }
            <form className="form" onSubmit={e => e.preventDefault()}>
              <div className="form__group">
                <input
                  className="form__input"
                  placeholder="Gebruikersnaam" 
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleInput.bind(null, 'setUsername')} />
              </div>
              <div className="form__group">
                <input 
                  className="form__input" 
                  placeholder="E-mail"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleInput.bind(null, 'setEmail')} />
                {state.emailInvalid ? <span className="text-danger">Geen geldig email adres</span> : ''}
              </div>
              <div className="form__group">
                <input 
                  className="form__input"
                  placeholder="Wachtwoord" 
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleInput.bind(null, 'setPassword')} />
              </div>
              <div className="form__group">
                <input 
                  className="form__input" 
                  placeholder="Herhaal wachtwoord"
                  type="password"
                  id="password-confirm"
                  name="password-confirm"
                  onChange={handleInput.bind(null, 'setPasswordConfirm')} />
                  {state.passwordMismatch ? <span className="text-danger">De wachtwoorden komen niet overeen</span> : ''}
              </div>
              <div className="form__group">
                <input 
                  className="btn btn-register"
                  type="submit"
                  disabled={state.isButtonDisabled}
                  onClick={handleRegistration}
                  value="Registreren" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}