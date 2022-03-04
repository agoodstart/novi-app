import { createPortal } from 'react-dom';

const createModalRoot = (rootId) => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', rootId);
    document.body.appendChild(rootId);
    return modalRoot;
}

function ReactPortal({ children, wrapperId}) {
    return createPortal(children, document.getElementById(wrapperId))
}

export default ReactPortal;