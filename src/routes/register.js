import '../css/components/form.css';

import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initialState = {
  username: '',
  email: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
}

const initialPasswordState = {
  password: '',
  passwordConfirm: '',
  isError: false,
  helperText: '',
}

const initialReducer = (state, action) => {
  switch(action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'setEmail':
      return {
        ...state,
        email: action.payload
      }
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload
      }
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed':
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

const passwordReducer = (state, action) => {
  switch(action.type) {
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
  const navigate = useNavigate();
  const auth = useAuth();

  const [formState, formDispatch] = useReducer(initialReducer, initialState);
  const [passwordState, passwordDispatch] = useReducer(passwordReducer, initialPasswordState);

  useEffect(() => {
    if(passwordState.password.trim() !== passwordState.passwordConfirm.trim()) {
      
    }
  }, [passwordState.password, passwordState.passwordConfirm])
  
  

  return (
    <main>
      <div className="form-wrapper">
        <h1>Registreer je account</h1>
          <form onSubmit={e => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="username">Gebruikersnaam</label>
              <input 
                type="text"
                id="username"
                name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Adres</label>
              <input 
                type="email"
                id="email"
                name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Wachtwoord</label>
              <input 
                type="password"
                id="password"
                name="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password-confirm">
                Herhaal Wachtwoord
              </label>
              <input 
                type="password"
                id="password-confirm"
                name="password-confirm" />
            </div>
            <div className="form-group">
              <button type="submit">Registreren</button>
            </div>
          </form>
      </div>
    </main>
  );
}