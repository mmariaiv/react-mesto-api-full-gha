import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import { authorizationApi } from "../utils/auth";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import ImagePopup from "./ImagePopup/ImagePopup";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ConfirmDeletingPopup from "./ConfirmDeletingPopup/ConfirmDeletingPopup";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);
	const [isConfirmDeletingPopupOpen, setIsConfirmDeletingPopupOpen] =
		React.useState(false);

	const [authUserEmail, setAuthUserEmail] = React.useState("");

	const [isLoading, setIsLoadingState] = React.useState(false);
	const [loggedIn, setLoggedIn] = React.useState(false);

	function handleLogin() {
		setLoggedIn(true);
	}

	const [selectedCard, setSelectedCard] = React.useState(null);
	const [deletingCard, setDeletingCard] = React.useState(null);

	const [currentUser, setCurrentUser] = React.useState({
		userName: "",
		userDescription: "",
		userAvatar: "",
		_id: "",
	});

	const [cards, setCards] = React.useState([]);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!checkToken()) {
			return;
		}

		api
			.getUserInfo()
			.then((info) => {
				setCurrentUser({
					userName: info.name,
					userDescription: info.about,
					userAvatar: info.avatar,
					_id: info._id,
				});
			})
			.catch((err) => {
				console.log(err, "error in searching userInfo");
			});

		api
			.getInitialCards()
			.then((initialCards) => {
				const currentCardsList = Array.from(initialCards.data);
				setCards(currentCardsList);
				console.log(currentCardsList);
			})
			.catch((err) => {
				console.log(err, "error in searching cards");
			});
	}, [loggedIn]);

	function checkToken() {
		if (localStorage.getItem("jwt")) {
			const jwt = localStorage.getItem("jwt");

			authorizationApi
				.getContent(jwt)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						setAuthUserEmail(res.email);

						navigate("/main", { replace: true });
					}
				})
				.catch((err) => {
					console.log(err, "error in checking token)");
				});

			return true;
		} else {
			return false;
		}
	}

	function handleSignOut() {
		localStorage.removeItem("jwt");
		setAuthUserEmail("");
		setLoggedIn(false);

		navigate("/login", { replace: true });
	}

	function handleCardClick(card) {
		return setSelectedCard(card);
	}

	function handleEditProfileClick() {
		return setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleEditAvatarClick() {
		return setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleAddPlaceClick() {
		return setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}

	function handleCardDeleteCLick(card) {
		setDeletingCard(card);
		return setIsConfirmDeletingPopupOpen(!isConfirmDeletingPopupOpen);
	}

	function handleCardDelete(card) {
		setIsLoadingState(true);
		api
			.deleteCard(card._id)
			.then((res) => {
				setCards((state) => {
					return cards.filter((c) => card._id !== c._id);
				});
			})
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in deleting card");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);

		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((state) => {
					return cards.map((c) => (c._id === card._id ? newCard : c))
				});
			})
			.catch((err) => {
				console.log(err, "error in cards setting");
			});
	}

	function handleUpdateUser(newUserInfo) {
		setIsLoadingState(true);
		api
			.changeUserInfo(newUserInfo)
			.then((res) => {
				setCurrentUser({
					userName: res.name,
					userDescription: res.about,
					userAvatar: res.avatar,
					_id: res._id,
				});
			})
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in updating userInfo");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}

	function handleUpdateAvatar(newAvatarUrl) {
		setIsLoadingState(true);
		api
			.changeAvatarPhoto(newAvatarUrl)
			.then((res) => {
				setCurrentUser({
					userName: res.name,
					userDescription: res.about,
					userAvatar: res.avatar,
					_id: res._id,
				});
			})
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in updating avatar");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}

	function handleAddPlace(newCardInfo) {
		setIsLoadingState(true);
		api
			.addNewCard(newCardInfo)
			.then((res) => {
				setCards([res.data, ...cards]);
			})
			.then(() => {
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err, "error in adding new card");
			})
			.finally(() => {
				setIsLoadingState(false);
			});
	}
	

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsConfirmDeletingPopupOpen(false);
		setSelectedCard(null);
		setDeletingCard(null);
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header
					loggedIn={loggedIn}
					onSignOut={handleSignOut}
					currentUserEmail={authUserEmail}
				/>
				<Routes>
					<Route
						path="/"
						element={
							loggedIn ? (
								<Navigate to="/main" replace />
							) : (
								<Navigate to="/login" replace />
							)
						}
					/>
					<Route
						path="/main"
						element={
							<ProtectedRoute
								element={Main}
								onEditAvatar={handleEditAvatarClick}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
								onCardDelete={handleCardDeleteCLick}
								cards={cards}
								loggedIn={loggedIn}
							/>
						}
					/>

					<Route path="/login" element={<Login handleLogin={handleLogin} />} />
					<Route path="/register" element={<Register />} />
				</Routes>

				{loggedIn && <Footer />}

				<EditProfilePopup
					onClose={closeAllPopups}
					isOpen={isEditProfilePopupOpen}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>

				<EditAvatarPopup
					onClose={closeAllPopups}
					isOpen={isEditAvatarPopupOpen}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>

				<AddPlacePopup
					onClose={closeAllPopups}
					isOpen={isAddPlacePopupOpen}
					onAddPlace={handleAddPlace}
					isLoading={isLoading}
				/>

				<ImagePopup card={selectedCard} onClose={closeAllPopups} />

				<ConfirmDeletingPopup
					onClose={closeAllPopups}
					isOpen={isConfirmDeletingPopupOpen}
					onConfirm={handleCardDelete}
					selectedCard={deletingCard}
					isLoading={isLoading}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
