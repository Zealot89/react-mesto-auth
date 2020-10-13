import React from "react";
import { Link } from "react-router-dom";

function Login({ handleReg }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function changeData(evt) {
    evt.target.type === "email"
      ? setEmail(evt.target.value)
      : setPassword(evt.target.value);
  }

  function clearForm() {
    setEmail("");
    setPassword("");
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      console.log("Заполните форму");
      return;
    } else {
      handleReg(email, password);
      clearForm();
    }
  }

  return (
    <form className="popup__form popup__form_auth" onSubmit={handleSubmit}>
      <h3 className="popup__title popup__title_auth">Регистрация</h3>

      <input
        className="popup__input popup__input_auth"
        type="email"
        value={email}
        autocomplete="on"
        onChange={changeData}
        placeholder="Email"
        minLength="8"
        maxLength="40"
        required
      />
      <input
        className="popup__input popup__input_auth"
        type="password"
        value={password}
        autocomplete="on"
        onChange={changeData}
        placeholder="Пароль"
        minLength="5"
        maxLength="40"
        required
      />

      <button className="popup__button popup__button_auth" type="submit">
        Зарегистрироваться
      </button>
      <div className="popup__auth-box">
        <p className="popup__auth-text"> Уже зарегистрированы?</p>
        <Link className="popup__auth-link" to="/sign-in">
          Войти
        </Link>
      </div>
    </form>
  );
}
export default Login;
