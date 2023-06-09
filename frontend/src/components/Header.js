import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import HeaderNavBurger from "./HeaderNavBurger";

export default function Header(props) {
  const [nav, setNav] = useState(false);
  const handleOpenMenu = () => {
    setNav(!nav);
  };
  const handleBurgOut = () => {
    handleOpenMenu();
    props.logOut();
  };

  //меню при брекпойнте мобильной версии
  return (
    <>
      <HeaderNavBurger
        email={props.email}
        toogle={nav}
        onClickOut={handleBurgOut}
      />
      <div className="header">
        <div className="header__logo"></div>

        <Routes>
          <Route
            path="signup"
            element={
              <Link to="/signin" className="header__text" button="true" hover="true">
                Войти
              </Link>
            }
          />
          <Route
            path="signin"
            element={
              <Link to="/signup" className="header__text" button="true" hover="true">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <HeaderNav
                email={props.email}
                toogle={nav}
                onClickMenu={handleOpenMenu}
                logOut={props.logOut}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}
