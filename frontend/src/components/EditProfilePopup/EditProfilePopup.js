import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const currentUser = React.useContext(CurrentUserContext);

	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateUser({
			name,
			about: description,
		});
	}

	React.useEffect(() => {
		setName(currentUser.userName);
		setDescription(currentUser.userDescription);
	}, [currentUser, props.isOpen]);

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleDescriptionChange(event) {
		setDescription(event.target.value);
	}

	return (
		<PopupWithForm
			name="edit-profile"
			title="Редактировать профиль"
			isOpen={props.isOpen}
			onClose={props.onClose}
			button={props.isLoading ? "Сохранение..." : "Сохранить"}
			onSubmit={handleSubmit}
		>
			<label className="popup__form-field">
				<input
					name="name"
					id="id-input"
					className="popup__input popup__input_type_name"
					placeholder="Введите имя"
					type="text"
					required
					minLength="2"
					maxLength="40"
					onChange={handleNameChange}
					value={name}
				/>
				<span className="popup__input-error id-input-error"></span>
			</label>

			<label className="popup__form-field">
				<input
					name="about"
					id="bio-input"
					className="popup__input popup__input_type_bio"
					placeholder="Введите описание"
					type="text"
					required
					minLength="2"
					maxLength="200"
					onChange={handleDescriptionChange}
					value={description}
				/>
				<span className="popup__input-error bio-input-error"></span>
			</label>
		</PopupWithForm>
	);
}
