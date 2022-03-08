import { useState, useRef, forwardRef } from 'react';
import Modal from '../components/Modal/Modal';

export default function useModal() {
    
    
    return forwardRef(Modal);
}