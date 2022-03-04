import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

// import { useAuth } from "../context/AuthContext";
import ReactPortal from '../portal/ReactPortal';

export default function Modal({ children, handleClose }) {
    const nodeRef = useRef(null);
    // const auth = useAuth();  
    // if (!auth.signInModalIsOpen) return null;

    return (
        <ReactPortal modalRootId="modal-container">
            <CSSTransition
                // in={auth.signInModalIsOpen}
                timeout={{ entry: 0, exit: 300}}
                unmountOnExit
                classNames="modal"
                nodeRef={nodeRef}
                >
                <div className="modal" ref={nodeRef}>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </ReactPortal>
    )
}