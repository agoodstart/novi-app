import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import ModalContent from "../../components/Modal/ModalContent";

import styles from './WebsiteLayout.module.scss';

export default function WebsiteLayout() {
    const { modalRef } = useAuth();

    return (
    <div className={styles['layout']}>
        <Navbar authModal={modalRef} />
        <Outlet />
        {/* <Footer /> */}
        <Modal ref={modalRef} >
            <ModalContent />
        </Modal>
    </div> 
    )
}