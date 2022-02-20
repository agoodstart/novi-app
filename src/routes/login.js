import "./Login.css";
import React, { useState, useCallback, useReducer, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useHeader from "../services/auth-header";

const initialState = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
};

const Action = { type: 'setUsername', payload: String }
  | { type: 'setPassword', payload: String }
  | { type: 'setIsButtonDisabled', payload: Boolean }
  | { type: 'loginSuccess', payload: String }
  | { type: 'loginFailed', payload: String }
  | { type: 'setIsError', payload: Boolean };

const reducer = (state, action = Action) => {
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
  const navigate = useNavigate();
  const auth = useAuth();
  const api = useHeader();

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
    
    auth.login(credentials)
      .then(lol => {
        console.log(lol);
      },
      error => {
        console.log(error);
        console.log('Gegevens onjuist, of het account is nog niet geregistreerd. Probeer het opnieuw, of maak een account aan.');
      })
    // navigate('/');
  }

  const handleKeyPress = e => {
    if(e.keyCode === 13 || e.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
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

  const fetchData = useCallback(async () => {
    try {
      const result = await api.get('/admin/all');
      console.log(result.data);
    } catch(err) {
      console.log(err);
    }
  }, []);

    return (
      <main style={{ padding: "1rem 0" }}>
        <div className="login-wrapper">
          <h1>Please Log In</h1>
          {/* {auth.user ? (
                 <p>{auth.user.sub} has logged in</p>
            ): (
                <p>log in</p>
            )} */}
            <form onSubmit={e => e.preventDefault()}>
              <label>
                <p>Username</p>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  onChange={handleUserNameInput}
                  onKeyPress={handleKeyPress}
                  />
              </label>
              <label>
                <p>Password</p>
                <input 
                  type="password" 
                  id="password"
                  name="password"
                  onChange={handlePasswordInput}
                  onKeyPress={handleKeyPress}
                  />
              </label>
              <div>
                <button 
                  type="submit"
                  disabled={state.isButtonDisabled}
                  onClick={handleLogin}
                  >Submit</button>
              </div>
            </form>

            <button onClick={() => fetchData()}>Fetch users</button>
        </div>
      </main>
    );
  }