class Auth {
	constructor(options) {
		this.options = options;
	}

	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	register(email, password) {
		return fetch(this.options.baseUrl + `/signup`, {
			method: "POST",
			headers: this.options.headers,
			
			body: JSON.stringify({
				password: password,
				email: email,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	authorize(email, password) {
		return fetch(this.options.baseUrl + `/signin`, {
			method: "POST",
			headers: this.options.headers,
			
			body: JSON.stringify({
				password: password,
				email: email,
			}),
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then((data) => {
				if (data.token) {
					localStorage.setItem("jwt", data.token);
					return data;
				}
			});
	}

	getContent(token) {
		const headers = this.options.headers;
		headers["Authorization"] = `Bearer ${token}`;

		return fetch(this.options.baseUrl + `/users/me`, {
			method: "GET",
			headers: headers,
			
		})
			.then((res) => {
				return this._getResponseData(res);
			})
			.then((data) => {
				return data;
			});
	}
}

export const authorizationApi = new Auth({
	baseUrl: "https://api.m.mmariaiv.nomoreparties.co",
	headers: {
		"Content-Type": "application/json",
	},
	
});
