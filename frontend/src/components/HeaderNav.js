import React from "react";
import { Link } from "react-router-dom";

export default function HeaderNav(props) {
  return (
    <>
      <div className="header__nav">
        <p className="header__email">{props.email || ""}</p>

        <Link
          to="/signin"
          className="header__text"
          button
          hover
          onClick={props.logOut}
        >
          Выйти
        </Link>
      </div>
      <button
        className={`header__button-nav ${
          props.toogle ? "header__button-nav_close" : ""
        }`}
        onClick={props.onClickMenu}
      />
    </>
  );
}
