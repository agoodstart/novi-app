import "./Login.css";
import React, { useState } from 'react';
import { useAuth } from "../auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const handleLogin = async e => {
    e.preventDefault();
    const user = {username, password};
    await auth.login(user);
  }

    return (
      <main style={{ padding: "1rem 0" }}>
        <div className="login-wrapper">
          <h1>Please Log In</h1>
            <form onSubmit={handleLogin}>
              <label>
                <p>Username</p>
                <input 
                  type="text" 
                  id="username" 
                  value={username} 
                  name="username"
                  onChange={({ target }) => setUsername(target.value)} />
              </label>
              <label>
                <p>Password</p>
                <input 
                  type="password" 
                  id="password" 
                  value={password} 
                  name="password"
                  onChange={({ target }) => setPassword(target.value)} />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
      </main>
    );
  }