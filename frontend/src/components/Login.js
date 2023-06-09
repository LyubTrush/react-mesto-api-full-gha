//компонент авторизации пользователя с необходимыми стейт-переменными.

import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import * as auth from "../utils/Auth";

export default function Login({ onSubmit }) {
  const [userValue, setUserValue] = React.useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserValue((st) => ({
      ...st,
      [name]: value,
    }));
    console.log(userValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userValue;
    onSubmit(email, password);
  };

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        ></input>
        <input
          className="register__input"
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        ></input>
        <button className="register__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
