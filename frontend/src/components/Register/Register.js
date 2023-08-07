import React from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { authorizationApi } from "../../utils/auth";

import InfoToolTip from "../InfoToolTip/InfoToolTip";

export default function Register() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [regStatus, setRegStatus] = React.useState();
	const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

	function handleRegistrationButtonClick() {
		return setIsInfoToolTipOpen(!isInfoToolTipOpen);
	}

	function handleClosePopup() {
		if (regStatus === true) {
			navigate("/login", { replace: true });
		}
		setIsInfoToolTipOpen(false);
		setRegStatus();
	}

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		authorizationApi
			.register(email, password)
			.then((res) => {
				setRegStatus(true);
			})
			.catch((err) => {
				setRegStatus(false);
				console.log(err, "error in register process");
			})
			.finally(() => {
				handleRegistrationButtonClick();
			});
	}

	return (
		<>
			<main className="content">
				<section className="auth auth_register">
					<div className="auth__container">
						<h2 className="auth__title">Регистрация</h2>
						<form
							className="auth__form"
							name="register"
							onSubmit={handleSubmit}
						>
							<label className="auth__form-field">
								<input
									className="auth__input auth__input_type_email"
									name="email"
									id="email-input"
									placeholder="Email"
									type="email"
									value={email}
									onChange={handleEmailChange}
									required
								/>
								<span className="auth__input-error email-input-error"></span>
							</label>

							<label className="auth__form-field">
								<input
									className="auth__input auth__input_type_password"
									name="password"
									id="password-input"
									placeholder="Пароль"
									type="password"
									value={password}
									onChange={handlePasswordChange}
									required
								/>
								<span className="auth__input-error password-input-error"></span>
							</label>

							<button className="auth__submit-button" type="submit">
								Зарегистрироваться
							</button>
						</form>

						<div className="auth__signup">
							<Link to="/login" className="auth__link">
								Уже зарегистрированы? Войти
							</Link>
						</div>
					</div>
				</section>
			</main>

			<InfoToolTip
				isOpen={isInfoToolTipOpen}
				regStatus={regStatus}
				onClose={handleClosePopup}
			/>
		</>
	);
}
