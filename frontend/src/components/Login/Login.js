import React from "react";

import { useNavigate } from "react-router-dom";

import { authorizationApi } from "../../utils/auth";

export default function Login(props) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const navigate = useNavigate();

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}
	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!email || !password) {
			return;
		}

		authorizationApi
			.authorize(email, password)
			.then((data) => {
				if (data) {
					setEmail("");
					setPassword("");
					props.handleLogin();

					navigate("/main", { replace: true });
				}
			})
			.catch((err) => {
				console.log(err, "error in signing in");
			});
	}

	return (
		<main className="content">
			<section className="auth auth_login">
				<div className="auth__container">
					<h2 className="auth__title">Вход</h2>
					<form className="auth__form" name="login" onSubmit={handleSubmit}>
						<label className="auth__form-field">
							<input
								className="auth__input login__input_type_email"
								id="email-input"
								name="email"
								placeholder="Email"
								type="text"
								value={email}
								onChange={handleEmailChange}
								required
							/>
							<span className="auth__input-error email-input-error"></span>
						</label>

						<label className="auth__form-field">
							<input
								className="auth__input login__input_type_password"
								id="password-input"
								name="password"
								placeholder="Пароль"
								type="password"
								value={password}
								onChange={handlePasswordChange}
								required
							/>
							<span className="auth__input-error password-input-error"></span>
						</label>

						<button className="auth__submit-button" type="submit">
							Войти
						</button>
					</form>

					{/* <div className="login__signup">
						<Link to="/register" className="signup__link">
							Зарегистрироваться
						</Link>
					</div> */}
				</div>
			</section>
		</main>
	);
}
