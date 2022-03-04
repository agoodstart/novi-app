import { createPortal } from 'react-dom';
import { useLayoutEffect, useState } from 'react';

// Creating modalRootelement if it doesn't exist
const createModalRoot = (modalRootId) => {
    const element = document.createElement('div');
    element.setAttribute('id', modalRootId);
    document.body.appendChild(element);
    return element;
}

function ReactPortal({ children, modalRootId}) {
    const [modalWrapperElement, setModalWrapperElement] = useState(null);
    const [systemCreated, setSystemCreated] = useState(false);

    // Because the program mutates the DOM directly, it's best to use useLayoutEffect
    useLayoutEffect(() => {
        // Nullish coalescing operator.
        // element === modalWrapperElement
        let element = document.getElementById(modalRootId) ?? (() => {
            setSystemCreated(true);
            return createModalRoot(modalRootId);
        });
        setModalWrapperElement(element);

        return () => {
            if(systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [modalRootId])

    if(modalWrapperElement === null) return null;

    return createPortal(children, modalWrapperElement)
}

export default ReactPortal;