import "./Login.css";
import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import useHeader from "../services/auth-header";

export default function Login() {
  const [requestError, setRequestError] = useState(null);
  const navigate = useNavigate();

  const auth = useAuth();
  const api = useHeader();

  const handleLogin = async e => {
    e.preventDefault();

    const credentials = {
      username: e.target.username.value, 
      password: e.target.password.value
    };
    
    await auth.login(credentials);
    navigate('/');
  }

  const fetchData = useCallback(async () => {
    try {
      const result = await api.get('/admin/all');
      console.log(result.data);
    } catch(err) {
      console.log(err);
    }
  });

    return (
      <main style={{ padding: "1rem 0" }}>
        <div className="login-wrapper">
          <h1>Please Log In</h1>
          {auth.user ? (
                 <p>{auth.user.sub} has logged in</p>
            ): (
                <p>log in</p>
            )}
            <form onSubmit={handleLogin}>
              <label>
                <p>Username</p>
                <input 
                  type="text" 
                  id="username" 
                  // value={username} 
                  name="username"
                  />
              </label>
              <label>
                <p>Password</p>
                <input 
                  type="password" 
                  id="password" 
                  // value={password} 
                  name="password"
                  />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>

            <button onClick={() => fetchData()}>Fetch users</button>
        </div>
      </main>
    );
  }