import React from 'react';
import CurrentUserContext from '../context/CurrentUserContext.js';

function Card({ card, name, id, link, likes, handleCardClick, onConfirmDelete, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__delete-button ${isOwn ? 'elements__delete-button_visible' : 'elements__delete-button_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`elements__button ${isLiked ? 'elements__button_active' : ''}`);

    function cardClick() {
        handleCardClick(card);
    }
    //Лайк и удаление
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <li className="elements__element elements__element_add" key={id} id={id}>
                <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" />
                <img
                    className="elements__image elements__image_add"
                    src={link}
                    alt={name}
                    onClick={cardClick}
                />
                <h2 className="elements__title elements__title_add">{name}</h2>
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                <p className="elements__like-counter">{likes.length}</p>
            </li>
        </CurrentUserContext.Provider>
    );
}
export default Card;