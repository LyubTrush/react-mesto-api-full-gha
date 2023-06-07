import React from "react";

import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={"link"}
      title={"Редактировать профиль"}
      submitText={"Сохранить"}
      children={
        <>
          <input
            ref={avatarRef}
            type="url"
            id="link"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input"
            required
          />
          <span className="avatarLink-error popup__input-error"></span>
        </>
      }
    />
  );
}
