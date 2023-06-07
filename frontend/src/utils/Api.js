class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _processingServer(res) {
    return res.ok ? res.json() : Promise.reject(`код ошибки: ${res.status}`);

    // if (res.ok) {
    //   return res.json();
    // } else {
    //   return Promise.reject(`код ошибки: ${res.status}`);
    // }
  }

  //редактирование профиля
  setProfileData(userData) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => this._processingServer(res));
  }

  setAvatar(link) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._processingServer(res));
  }

  //метод получения карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then((res) => this._processingServer(res));
  }

  //метод добавления новой карточки
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._processingServer(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._processingServer(res));
  }

  likeResolve(cardId, isLiked) {
    if (isLiked === false) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._processingServer(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._processingServer(res));
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._processingServer(res));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60/",
  headers: {
    authorization: "07ee7a40-2dda-43a0-8aeb-c95180da94fb",
    "Content-Type": "application/json",
  },
});

export default api;
