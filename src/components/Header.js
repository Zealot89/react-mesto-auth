import React from "react";
import logo from "../images/Vector.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, userData, onSignOut }) {
  const { pathname } = useLocation();

  const linkText = `${pathname === "/sign-in" ? "Регистрация" : "Войти"}`;
  const linkPath = `${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`;

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого" />
      {loggedIn ? (
        <div className="header__nav">
          <p className="header__link header__text">{userData}</p>
          <button
            className="header__button header__text"
            type="button"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </div>
      ) : (
        <Link to={linkPath} className="header__link header__text">
          {linkText}
        </Link>
      )}
    </header>
  );
}
export default Header;
