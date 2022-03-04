import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const auth = useAuth();

  return (
      <section className="section-dashboard">
        <div className="row">
            <button onClick={() => auth.toggleSignInModal(true)}>Open Modal</button>
        </div>
      </section>
    );
  }

