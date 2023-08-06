import React from "react";
import Card from "../Card/Card";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__menu">
					<button
						className="profile__avatar-button"
						type="button"
						onClick={props.onEditAvatar}
					>
						<img
							src={currentUser.userAvatar}
							alt="Аватар пользователя"
							className="profile__avatar"
						/>
					</button>
					<div className="profile__info">
						<h1 className="profile__name">{currentUser.userName}</h1>
						<p className="profile__bio">{currentUser.userDescription}</p>
						<button
							className="profile__edit-button"
							type="button"
							onClick={props.onEditProfile}
						></button>
					</div>
				</div>
				<button
					className="profile__add-button"
					type="button"
					onClick={props.onAddPlace}
				></button>
			</section>

			<section className="elements">
				{props.cards.map((newCard) => {
					return (
						<Card
							key={newCard._id}
							card={newCard}
							onCardClick={props.onCardClick}
							onCardLike={props.onCardLike}
							onCardDelete={props.onCardDelete}
						/>
					);
				})}
			</section>
		</main>
	);
}

export default Main;
