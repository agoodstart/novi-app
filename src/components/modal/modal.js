import React, { useState } from 'react';

export default function Modal({ children }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            {children}
        </div>
    )
}