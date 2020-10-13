import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const linkRef = React.useRef();
    const nameRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            link: linkRef.current.value,
            name: nameRef.current.value
        });
    }

    return (
        <PopupWithForm
            name=""
            title="Новое место"
            isOpen={isOpen}
            btnText={"Добавить"}
            close={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__input-wrapper">
                <input
                    className="popup__input popup__input_place"
                    id="name-card"
                    placeholder="Название"
                    name="name"
                    tabIndex="1"
                    type="text"
                    minLength="1"
                    maxLength="30"
                    required
                    ref={nameRef}
                />
                <span className="popup__error" id="name-card-error"></span>
            </label>
            <label className="popup__input-wrapper">
                <input
                    className="popup__input popup__input_link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    name="link"
                    tabIndex="2"
                    type="url"
                    required
                    ref={linkRef}
                />
                <span className="popup__error" id="link-error"></span>
            </label>
        </PopupWithForm>
    )
}




export default AddPlacePopup;