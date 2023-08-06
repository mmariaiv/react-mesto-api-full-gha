import React from "react";

function ImagePopup({ card, onClose }) {
	function closeByClickingOutside(event) {
		if (event.currentTarget === event.target) {
			onClose();
		}
	}

	return (
		<div
			className={`popup popup_image ${card && `popup_opened`}`}
			onClick={closeByClickingOutside}
		>
			<div className="popup__photo-container">
				<button
					type="button"
					className="popup__close-button"
					onClick={onClose}
				></button>
				<img src={card?.link} alt={card?.name} className="popup__photo" />
				<h2 className="popup__description">{card?.name}</h2>
			</div>
		</div>
	);
}

export default ImagePopup;
