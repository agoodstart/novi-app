import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "./../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";
import Modal from "./../components/Modal/Modal";
import ModalContent from "./../components/Modal/ModalContent";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Layout.module.scss';


export default function Layout() {
    const { modalRef } = useAuth();

    return (
    <div className={styles['layout']}>
        <Navbar authModal={modalRef} />
        <ToastContainer />
        <Outlet />
        {/* <Footer /> */}
        <Modal ref={modalRef} >
            <ModalContent />
        </Modal>
    </div> 
    )
}