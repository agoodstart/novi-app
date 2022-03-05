import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ReactPortal from "../portal/ReactPortal";
import "../../css/components/modal.css";

const Modal = (props, ref) => {
	console.log('modal component rendered');

	const nodeRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	useImperativeHandle(ref, () => ({
		openModal: () => setIsOpen(true)
	}));

	useEffect(() => {
		const closeOnEscapeKey = (e) => (e.key === "Escape" ? setIsOpen(false) : null);
		document.body.addEventListener("keydown", closeOnEscapeKey);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKey);
		};
	}, [setIsOpen]);

	return (
		<ReactPortal wrapperId="modal-container">
			<CSSTransition
				in={isOpen}
				timeout={{ entry: 0, exit: 300 }}
				unmountOnExit
				classNames="modal"
				nodeRef={nodeRef}
			>
				<div className="modal" ref={nodeRef}>
					<button onClick={() => setIsOpen(false)} className="close-btn">
						Close
					</button>
					<div className="modal-content">This is modal content!</div>
				</div>
			</CSSTransition>
		</ReactPortal>
	);
}
export default forwardRef(Modal);
