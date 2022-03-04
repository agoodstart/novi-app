import { createPortal } from 'react-dom';
import { useLayoutEffect, useState } from 'react';


const createModalRoot = (modalRootId) => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', modalRootId);
    document.body.appendChild(modalRootId);
    return modalRoot;
}

function ReactPortal({ children, modalRootId}) {
    const [modalWrapperElement, setModalWrapperElement] = useState(null)

    let modalRoot = document.getElementById(modalRootId) ?? createModalRoot(modalRootId);

    useLayoutEffect(() => {
      first
    
      return () => {
        second
      };
    }, [modal])

    return createPortal(children, document.getElementById(modalRootId))
}

export default ReactPortal;