import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../context/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name=""
      title="Редактировать профиль"
      isOpen={isOpen}
      btnText={"Сохранить"}
      close={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-wrapper">
        <input
          className="popup__input popup__input_name "
          id="name"
          placeholder="Имя"
          name="name"
          tabIndex="1"
          minLength="2"
          maxLength="40"
          required
          type="text"
          onChange={handleChangeName}
          value={name}
        />
        <span className="popup__error" id="name-error"></span>
      </label>
      <label className="popup__input-wrapper">
        <input
          className="popup__input popup__input_activiti"
          id="activiti"
          placeholder="Род занятий"
          name="about"
          tabIndex="2"
          type="text"
          minLength="2"
          maxLength="200"
          required
          onChange={handleChangeDescription}
          value={description}
        />
        <span className="popup__error" id="activiti-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
