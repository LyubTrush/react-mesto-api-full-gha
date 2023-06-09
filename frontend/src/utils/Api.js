class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _processingServer(res) {
    return res.ok ? res.json() : Promise.reject(`код ошибки: ${res.status}`);
  }

  //редактирование профиля
  setProfileData(userData) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then((res) => this._processingServer(res));
  }

  setAvatar(link) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        link,
      ),
    }).then((res) => this._processingServer(res));
  }

  //метод получения карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._processingServer(res));
  }

  //метод добавления новой карточки
  addCard({name, link}) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link
      }),
    }).then((res) => this._processingServer(res));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._processingServer(res));
  }

  likeResolve(cardId, isLiked) {
    const token = localStorage.getItem("jwt");
    if (isLiked === false) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => this._processingServer(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => this._processingServer(res));
    }
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._processingServer(res));
  }
}

const api = new Api({
  baseUrl: "https://api.lovelly.nomoredomains.rocks",
});

export default api;
