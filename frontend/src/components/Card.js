//Обработчик handleCardClick должен вызываться
// из компонента Card. Для этого его нужно «пробросить» в компонент Card сквозь компонент Main — в виде пропса onCardClick.

import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((id) => id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__info-heart ${
    isLiked && "element__info-heart_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />

      {isOwn && (
        <button
          className="element__delete"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__info">
        <h2 className="element__info-text">{props.card.name}</h2>
        <div className="element__like-card">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
