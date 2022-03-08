import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  console.log('dashboard route rendered');
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

