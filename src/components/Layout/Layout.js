import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";

export default function Layout() {
    const { modalRef } = useAuth();

    return (
    <>
        <Navbar />
            <main className="App">
                <Outlet />
            </main>
        <Footer />
        <Modal ref={modalRef} />
    </>
    )
}