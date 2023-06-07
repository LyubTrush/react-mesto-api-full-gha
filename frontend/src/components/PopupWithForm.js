import React from "react";

export default function PopupWithForm(props) {
  return (
    <div
      className={
        `popup popup_${props.name}` + (props.isOpen && " popup_opened")
      }
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__btn-close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__text-profile">{props.title}</h2>
        <form
          name={props.name}
          className={`popup__forma popup__forma-${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className={`popup__btn-save popup__btn-yes${props.name}`}
          >
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  );
}
