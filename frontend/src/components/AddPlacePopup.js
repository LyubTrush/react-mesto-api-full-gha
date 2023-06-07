import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: urlRef.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={"add"}
      title={"Новое место"}
      submitText={"Сохранить"}
      children={
        <>
          {" "}
          <input
            ref={nameRef}
            type="text"
            placeholder="Название"
            id="title"
            //value=""
            // minLength="2"
            // maxLength="30"
            className="popup__input popup__input_add_name"
            required
          />
          <span className="title-error popup__input-error"></span>
          <input
            ref={urlRef}
            type="url"
            id="link"
            placeholder="Ссылка на картинку"
            //minLength="2"
            className="popup__input popup__input_add_link"
            required
          />
          <span className="link-error popup__input-error"></span>
        </>
      }
    />
  );
}
