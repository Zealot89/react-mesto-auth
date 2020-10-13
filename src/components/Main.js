import React from "react";

import Card from "./Card.js";
import CurrentUserContext from '../context/CurrentUserContext.js';

function Main({ cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onConfirmDelete, handleCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__image-button"
          />
          <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
          />
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        />
      </section>
      <section className="elements">
        <ul className="elements__list">

          {cards.map((item) =>
            <Card card={item} name={item.name} id={item._id} link={item.link} key={item._id} likes={item.likes} onCardLike={onCardLike} onConfirmDelete={onConfirmDelete} handleCardClick={handleCardClick} onCardDelete={onCardDelete} />

          )}
        </ul>
      </section>
    </main>
  );
}
export default Main;
