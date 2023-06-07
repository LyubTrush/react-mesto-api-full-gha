import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // добавьте стейт-переменные name и description
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onUpdateUser={onUpdateUser}
      name={"profile"}
      title={"Обновить аватар"}
      submitText={"Сохранить"}
      children={
        <>
          <input
            type="text"
            placeholder="Введите имя"
            id="username"
            name="username"
            onChange={handleName}
            value={name || ""}
            className="popup__input popup__input_type_name"
            required="required"
          />
          <span className="username-error popup__input-error"></span>
          <input
            type="text"
            id="job"
            name="job"
            onChange={handleDescription}
            value={description || ""}
            placeholder="Чем занимаетесь?"
            //minlength="2"
            //maxlength="200"
            className="popup__input popup__input_type_prof"
            required="required"
          />
          <span className="job-error popup__input-error"></span>
        </>
      }
    />
  );
}
