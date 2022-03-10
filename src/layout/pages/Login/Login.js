import React, { useReducer, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const initialState = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setUsername':
        return {
            ...state,
            username: action.payload
        };
    case 'setPassword':
        return {
            ...state,
            password: action.payload
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

export default function Login() {
  console.log('login route rendered');
  const navigate = useNavigate();
  const {auth} = useAuth();

  console.log(auth);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if(state.username.trim() && state.password.trim()) {
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
  }, [state.username, state.password]);

  const handleLogin = () => {
    const credentials = {
      username: state.username, 
      password: state.password
    };

    console.log(credentials);

    auth
      .signin(credentials)
      .then(res => {
        navigate('/profile')
        // console.log(res);
      },
      err => {
        console.log(err);
      })
    
    // auth.login(credentials)
    //   .then(lol => {
    //     console.log(lol);
    //   },
    //   error => {
    //     console.log(error);
    //     console.log('Gegevens onjuist, of het account is nog niet geregistreerd. Probeer het opnieuw, of maak een account aan.');
    //   })
    // navigate('/');
  }

  const handleUserNameInput = e => {
    dispatch({
      type: 'setUsername',
      payload: e.target.value
    })
  }

  const handlePasswordInput = e => {
    dispatch({
      type: 'setPassword',
      payload: e.target.value
    })
  }

  return (
    <div className="row">
      <h1>Log In</h1>
        <form onSubmit={e => e.preventDefault()}>
          <div className="form__group">
            <label htmlFor="username">Username</label>
              <input 
                type="text"
                id="username" 
                name="username"
                onChange={handleUserNameInput}
                />
          </div>
          <div className="form-group">
          <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              onChange={handlePasswordInput}
              />
          </div>
          <div>
            <button 
              type="submit"
              disabled={state.isButtonDisabled}
              onClick={handleLogin}
              >Submit</button>
          </div>
        </form>
    </div>
  );
}