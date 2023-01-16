import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../Portal/ReactPortal";
import styles from './Modal.module.scss';

import useTheme from "../../hooks/useTheme";
import Button from "../Button/Button";

const Modal = (props, ref) => {
	const { colors } = useTheme();
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
				<Button color={colors.background.secondary.light}
					onClick={() => setIsOpen(false)}
					size="medium"
					elevation={2}
					customStyles={{
						marginBottom: '1rem'
					}}
					>Close</Button>
					<div className={styles.modal__content}>{props.children}</div>
				</div>
			</CSSTransition>
		</ReactPortal>
	);
}
export default forwardRef(Modal);
