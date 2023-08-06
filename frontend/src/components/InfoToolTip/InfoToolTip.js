import React from "react";
import okStatusPicture from "../../images/ok_status.svg";
import notOkStatusPicture from "../../images/not_ok_status.svg";

export default function InfoToolTip(props) {
	function closeByClickingOutside(event) {
		if (event.currentTarget === event.target) {
			props.onClose();
		}
	}

	return (
		<div
			className={`popup ${props.isOpen && `popup_opened`}`}
			onClick={closeByClickingOutside}
		>
			<div className="popup__container_reg popup__container">
				<button
					type="button"
					className="popup__close-button"
					onClick={props.onClose}
				></button>
				<img
					className="popup__status-picture"
					src={props.regStatus ? okStatusPicture : notOkStatusPicture}
					alt="Рисунок статуса регистрации"
				></img>
				<h2 className="popup__title popup__title_reg">
					{props.regStatus
						? "Вы успешно зарегистрировались"
						: "Что-то пошло не так! Попробуйте ещё раз."}
				</h2>
			</div>
		</div>
	);
}
