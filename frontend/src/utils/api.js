class Api {
	constructor(options) {
		this.options = options;
	}

	getInitialCards() {
		return fetch(this.options.baseUrl + "/cards", {
			headers: this.options.headers,
			
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	getUserInfo() {
		return fetch(this.options.baseUrl + "/users/me", {
			headers: this.options.headers,
			
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	changeUserInfo(newUserInfo) {
		return fetch(this.options.baseUrl + "/users/me", {
			method: "PATCH",
			
			headers: this.options.headers,
			body: JSON.stringify({
				name: newUserInfo.name,
				about: newUserInfo.about,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	addNewCard(item) {
		return fetch(this.options.baseUrl + `/cards/`, {
			method: "POST",
			headers: this.options.headers,
			body: JSON.stringify({
				name: item.name,
				link: item.link,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	deleteCard(cardID) {
		return fetch(this.options.baseUrl + `/cards/${cardID}`, {
			method: "DELETE",
			
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	changeAvatarPhoto(link) {
		return fetch(this.options.baseUrl + `/users/me/avatar`, {
			method: "PATCH",
			
			headers: this.options.headers,
			body: JSON.stringify(link),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	putLikeOnCard(cardId) {
		return fetch(this.options.baseUrl + `/cards/${cardId}/likes`, {
			method: "PUT",
			
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	deleteLikeOnCard(cardId) {
		return fetch(this.options.baseUrl + `/cards/${cardId}/likes`, {
			method: "DELETE",
			
			headers: this.options.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (!isLiked) {
			return this.deleteLikeOnCard(cardId);
		} else {
			return this.putLikeOnCard(cardId);
		}
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}
}

export const api = new Api({
	baseUrl: "http://localhost:4000",
	headers: {
		'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
		"Content-Type": "application/json",
	},
});
