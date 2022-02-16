export default function Register() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <div className="login-wrapper">
          <h1>Registreer je account</h1>
            <form>
              <label>
                <p>Gebruikersnaam</p>
                <input type="text" />
              </label>
              <label>
                <p>Password</p>
                <input type="password" />
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
        </div>
      </main>
    );
  }