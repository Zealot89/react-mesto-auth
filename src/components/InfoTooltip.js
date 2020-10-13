import React from "react";

function InfoTooltip({ isOpen, close, image, text }) {
  return (
    <section className={isOpen ? "popup popup_active" : "popup "}>
      <div className="popup__form">
        <button className="popup__toggle" type="button" onClick={close} />
        <img
          className="popup__infoTooltip-image"
          alt="Картинка"
          src={image}
        ></img>
        <p className="popup__infoTooltip-text">{text}</p>
      </div>
    </section>
  );
}
export default InfoTooltip;
