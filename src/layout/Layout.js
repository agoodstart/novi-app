import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";

import RegisterForm from "./components/Form/RegisterForm";

export default function Layout() {
    const { modalRef } = useAuth();

    return (
    <>
        <Navbar />
            <main className="App">
                <Outlet />
            </main>
        <Footer />
        <Modal ref={modalRef} >
            <RegisterForm />
        </Modal>
    </> 
    )
}