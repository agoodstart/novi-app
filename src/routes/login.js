import "./Login.css";
import React, { useState } from 'react';
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    console.log(event);
    alert('Form submitted: ' + event.target.value);
  }

    return (
      <main style={{ padding: "1rem 0" }}>
        <div className="login-wrapper">
          <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Username</p>
                <input type="text" id="username" name="username" />
              </label>
              <label>
                <p>Password</p>
                <input type="password" id="password" name="password" />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
      </main>
    );
  }