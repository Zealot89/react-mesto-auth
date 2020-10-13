import React from "react";
function PopupWithForm({ name, title, close, isOpen, children, onSubmit, btnText }) {
  return (
    <section className={isOpen ? "popup popup_active" : "popup "}>
      <form
        method="GET" action="#"
        name={name}
        className={`popup__form popup__form_${name}`}
        onSubmit={onSubmit}
      >
        <button
          className="popup__toggle"
          type="button"
          onClick={close}
        />
        <h3 className="popup__title">{title}</h3>
        {children}
        <button type="submit" className="popup__button">
          {btnText}
        </button>
      </form>
    </section>
  );
}
export default PopupWithForm;
