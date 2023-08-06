import React from "react";
import { useLocation } from "react-router-dom";
import headerLogo from "../../images/header__logo.svg";
import { useNavigate } from "react-router-dom";

function Header(props) {
	const location = useLocation();
	const navigate = useNavigate();
	const [isBurgerMenuClicked, setIsBurgerMenuClicked] = React.useState(false);

	function handleSignOut() {
		props.onSignOut();
	}

	function handleSignUp() {
		navigate("/register", { replace: true });
	}

	function handleSignIn() {
		navigate("/login", { replace: true });
	}

	function handleBurgerMenuCLick() {
		setIsBurgerMenuClicked(!isBurgerMenuClicked);
	}

	return (
		<header className={`header ${isBurgerMenuClicked && "header_mobile-menu"}`}>
			<div
				className={`${isBurgerMenuClicked && "header__mobile-logo-container"}`}
			>
				<img
					src={headerLogo}
					alt="Логотип проекта Место Россия"
					className="logo"
				/>
				{isBurgerMenuClicked && (
					<button
						className="header__close-button"
						onClick={handleBurgerMenuCLick}
					/>
				)}
			</div>
			<div
				className={`header__container  ${
					isBurgerMenuClicked && "header__container_mobile"
				}`}
			>
				{props.currentUserEmail && (
					<p className="header__email">{props.currentUserEmail}</p>
				)}
				<button
					className="header__button"
					onClick={
						props.loggedIn
							? handleSignOut
							: location.pathname == "/login"
							? handleSignUp
							: handleSignIn
					}
				>
					{props.loggedIn
						? "Выйти"
						: location.pathname == "/login"
						? "Регистрация"
						: "Войти"}
				</button>
			</div>

			<button
				className={`header__menu-burger-btn ${
					isBurgerMenuClicked && "header__menu-burger-btn_off"
				}`}
				onClick={handleBurgerMenuCLick}
			>
				<div className="header__menu-item"></div>
				<div className="header__menu-item"></div>
				<div className="header__menu-item"></div>
			</button>
		</header>
	);
}

export default Header;
