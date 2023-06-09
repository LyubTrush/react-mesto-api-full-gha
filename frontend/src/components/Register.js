//компонент регистрации пользователя с необходимыми стейт-переменными.

import React from "react";
import { Link } from "react-router-dom";

export default function Register({ onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      const formData = {
        email,
        password,
      };
      onSubmit(formData);
    },
    [email, onSubmit, password]
  );

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          className="register__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?{" "}
        <Link to="/signin" className="register__text">
          Войти
        </Link>{" "}
      </p>
    </div>
  );
}
