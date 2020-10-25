const BASE_URL = "http://www.api.zealot.students.nomoreparties.co";

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.statusText);
  });
}

export function authorization(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => res.json())
    //.then((res) => {
    //  if (res.ok) return res.json();
    //  else return Promise.reject(res.statusText);
    //})
    .then((data) => {
      if (data.token) {
        console.log(data);
        localStorage.setItem("token", data.token);
        return data;
      }
    });
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then((data) => data);
}
