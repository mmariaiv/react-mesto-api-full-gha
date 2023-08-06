import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup(props) {
	const newCardNameRef = React.useRef("");
	const newCardLinkRef = React.useRef("");

	function handleSubmit(e) {
		e.preventDefault();

		props.onAddPlace({
			name: newCardNameRef.current.value,
			link: newCardLinkRef.current.value,
		});
	}

	React.useEffect(() => {
		if (props.isOpen) {
			newCardLinkRef.current.value = "";
			newCardNameRef.current.value = "";
		}
	}, [props.isOpen]);

	return (
		<PopupWithForm
			name="add-photo"
			title="Новое место"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			button={props.isLoading ? "Создание..." : "Создать"}
		>
			<label className="popup__form-field">
				<input
					name="picture-name"
					className="popup__input popup__input_type_picture-name"
					id="name-input"
					placeholder="Название"
					type="text"
					required
					minLength="2"
					maxLength="30"
					ref={newCardNameRef}
				/>
				<span className="popup__input-error name-input-error"></span>
			</label>

			<label className="popup__form-field">
				<input
					name="link"
					className="popup__input popup__input_type_link"
					id="link-input"
					placeholder="Ссылка на картинку"
					type="url"
					required
					ref={newCardLinkRef}
				/>
				<span className="popup__input-error link-input-error"></span>
			</label>
		</PopupWithForm>
	);
}
