import React from "react";

export default function ConfirmDeletingPopup(props) {
	function closeByClickingOutside(event) {
		if (event.currentTarget === event.target) {
			props.onClose();
		}
	}

	function handleConfirmDeleting() {
		const card = props.selectedCard;
		props.onConfirm(card);
	}
	return (
		<div
			className={`popup popup_confirm ${props.isOpen && `popup_opened`}`}
			onClick={closeByClickingOutside}
		>
			<div className="popup__container">
				<button
					type="button"
					className="popup__close-button"
					onClick={props.onClose}
				></button>
				<h2 className="popup__title">Вы уверены?</h2>
				<button
					className="popup__confirm-button"
					type="button"
					onClick={handleConfirmDeleting}
				>
					{props.isLoading ? "Удаление..." : "Да"}
				</button>
			</div>
		</div>
	);
}
