import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { modalRef } = useAuth();

  const handleOpenModal = () => {
    modalRef.current.openModal();
  }

  return (
      <section className="section-dashboard">
        <div className="row">
            <button onClick={handleOpenModal}>Open Modal</button>
        </div>
      </section>
    );
  }

