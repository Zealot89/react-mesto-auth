import React from "react";
function ImagePopup({ card, close }) {

  return (
    <section class={`popup popup_review ${(typeof (card) == 'boolean') ? '' : 'popup_active'}`}>
      <figure class="popup__figure">
        <button
          class="popup__toggle  popup__toggle_review"
          type="button"
          onClick={close}
        />
        <img class="popup__image" src={card.link} alt={card.name} />
        <figcaption class="popup__subtitle">{card.name}</figcaption>

      </figure>
    </section>
  );
}
export default ImagePopup;
