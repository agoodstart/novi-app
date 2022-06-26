import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../Portal/ReactPortal";
import styles from './Modal.module.scss';

const Modal = (props, ref) => {
	// console.log('modal component rendered');

	const nodeRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		openModal: () => setIsOpen(true),
		closeModal: () => setIsOpen(false)
	}));

	useEffect(() => {
		const closeOnEscapeKey = (e) => (e.key === "Escape" ? setIsOpen(false) : null);
		// const closeOnClick = (_e) => ( setIsOpen(false) );
		
		// const modalOverlay = document.querySelector("div.modal");
		
		// modalOverlay.addEventListener("click", closeOnClick)
		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
			// modalOverlay.removeEventListener("click", closeOnClick);
		};
	}, [setIsOpen]);

	return (
		<ReactPortal wrapperId="modal-container">
			<CSSTransition
				in={isOpen}
				timeout={{ entry: 0, exit: 300 }}
				unmountOnExit
				classNames={{
					enterDone: styles['modal-enter-done'],
					exit: styles['modal-exit']
				}}
				nodeRef={nodeRef}
			>
				<div className={styles.modal} ref={nodeRef}>
					<button onClick={() => setIsOpen(false)} className="close-btn">
						Close
					</button>
					<div className={styles.modal__content}>{props.children}</div>
				</div>
			</CSSTransition>
		</ReactPortal>
	);
}
export default forwardRef(Modal);
