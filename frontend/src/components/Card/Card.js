import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some((i) => i._id === currentUser._id);
	const cardLikeButtonClassName = `element__like-button ${
		isLiked && "element__like-button_active"
	}`;

	return (
		<div className="element">
			<img
				src={card.link}
				alt={card.name}
				className="element__image"
				onClick={handleClick}
			/>
			{isOwn && (
				<button
					className="element__delete-button"
					onClick={handleDeleteClick}
				/>
			)}
			<div className="element__description">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like-container">
					<button
						className={cardLikeButtonClassName}
						type="button"
						onClick={handleLikeClick}
					></button>
					<p className="element__like-quantity">{card.likes.length}</p>
				</div>
			</div>
		</div>
	);
}

export default Card;
