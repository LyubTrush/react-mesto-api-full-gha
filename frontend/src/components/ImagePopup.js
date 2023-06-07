export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_img-view ${card && "popup_opened"}`}>
      <div className="popup__img-conteiner">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={card ? card.link || "" : ""}
            alt={card ? card.name : ""}
          />
          <figcaption className="popup__caption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
