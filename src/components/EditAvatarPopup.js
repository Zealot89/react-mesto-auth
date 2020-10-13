import React from "react";

import PopupWithForm from "./PopupWithForm.js";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  //const currentUser = React.useContext(CurrentUserContext);
  const linkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name=""
      title="Обновить аватар"
      isOpen={isOpen}
      btnText={"Сохранить"}
      close={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-wrapper">
        <input
          className="popup__input popup__input_link-avatar"
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
  );
}
export default EditAvatarPopup;
