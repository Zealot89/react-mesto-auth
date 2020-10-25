class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.token = options.headers.authorization;
  }
  
  getInitialCards() {
   
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserData(func) {
    
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  saveUserData({ name, about }) {
    console.log(this.token);
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization:`Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  saveCardData({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (!res.ok) return Promise.reject(`Ошибка: ${res.status}`);
      return res.json();
    });
  }

  deleteCardData(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    });
  }

  changeLikeCardStatus(cardId, isLike) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: isLike ? "PUT" : "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeAvatar(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
        //return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

//Экземпляр класса Api
const api = new Api({
  baseUrl: "http://www.api.zealot.students.nomoreparties.co",
  headers: {
    "authorization": `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
  
});
export default api;
