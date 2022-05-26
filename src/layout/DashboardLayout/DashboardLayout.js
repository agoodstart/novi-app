import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import ModalContent from "../../components/Modal/ModalContent";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
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