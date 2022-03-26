import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import ModalContent from "./components/Modal/ModalContent";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Layout() {
    const { modalRef } = useAuth();

    return (
    <>
        <Navbar />
            <ToastContainer />
            <main className="App">
                <Outlet />
            </main>
        <Footer />
        <Modal ref={modalRef} >
            <ModalContent />
        </Modal>
    </> 
    )
}