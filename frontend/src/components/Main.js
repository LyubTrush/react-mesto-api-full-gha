//В компоненте Main добавьте переменные состояния userName, userDescription и userAvatar. Используйте их в JSX.
//Добавьте ещё одну переменную стейта cards с пустым массивом в качестве значения по умолчанию. Добавьте второй запрос
//к API за соответствующими данными.

import React from "react";
// import Avatar from "../images/Avatar.png";
// import api from "../utils/Api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="аватар"
          />
          <button
            className="profile__avatar-btn"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="profile__info-edit">
              <h1 className="profile__info-title">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Редактировать профиль"
                className="profile__button-edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__info-subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
