import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
	const userAvatarRef = React.useRef("");

	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateAvatar({
			avatar: userAvatarRef.current.value,
		});
	}

	React.useEffect(() => {
		if (props.isOpen) {
			userAvatarRef.current.value = "";
		}
	}, [props.isOpen]);

	return (
		<PopupWithForm
			name="update-avatar"
			title="Обновить аватар"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			button={props.isLoading ? "Сохранение..." : "Сохранить"}
		>
			<label className="popup__form-field">
				<input
					name="avatar"
					className="popup__input popup__input_type_link"
					id="avatar-input"
					placeholder="Ссылка на аватар"
					type="url"
					required
					ref={userAvatarRef}
				/>
				<span className="popup__input-error avatar-input-error"></span>
			</label>
		</PopupWithForm>
	);
}
