import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import * as auth from "../utils/Auth";
import ToolTip from "./ToolTip.js";
import yes from "../images/yes.png";
import no from "../images/no.png";

function App() {
  //состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
 // const [DeletedCard, setDeletedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  //пользователь
  const [currentUser, setCurrentUser] = useState({});

  //эффект получения информации о пользователе и
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then(setCurrentUser)
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // функции обработчики открытия попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .likeResolve(card._id, isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // обработчик регистрации
  const handleSignup = React.useCallback(
    (email, password) => {
      auth
        .register(email, password)
        .then(() => {
          setPopupImage(yes);
          setRegisterMessage("Вы успешно зарегистрировались!");
          navigate("/");
        })
        .catch(() => {
          setPopupImage(no);
          setRegisterMessage("Что-то пошло не так! Попробуйте ещё раз.");
        })
        .finally(handleInfoTooltip);
    },
    [navigate]
  );

  // обработчик авторизации
  const handleSignin = React.useCallback(
    (email, password) => {
      auth
        .signin(email, password)
        .then((response) => {
          if (response.token) {
            localStorage.setItem("jwt", response.token);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setPopupImage(no);
          setRegisterMessage("Что-то пошло не так! Попробуйте ещё раз.");
          handleInfoTooltip();
        });
    },
    [navigate]
  );

  function handleLogOut() {
    localStorage.removeItem("jwt");
    navigate('/signin');
    setEmail("");
    setLoggedIn(false);
  }
// проверка токена 
  const checkAuthorisation = React.useCallback(() => {
    const token = localStorage.getItem("jwt");
    token &&
      auth
        .checkAuth(token)
        .then((response) => {
          setEmail(response.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
        });
  }, [navigate]);

  //проверка авторизации
  useEffect(() => {
    checkAuthorisation();
  }, [checkAuthorisation]);

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('jwt');
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    const jwt = localStorage.getItem('jwt');
    api
      .setProfileData(userInfo, jwt)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(userInfo);
  }
  function handleUpdateAvatar(link) {
    const jwt = localStorage.getItem('jwt');
    api
      .setAvatar(link, jwt)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    const jwt = localStorage.getItem('jwt');
    api
      .addCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // auth
  function handleRegisterMessage(message) {
    setRegisterMessage(message);
  }

  //обработчик закрытия
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} logOut={handleLogOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegisterMessage={handleRegisterMessage}
                onSubmit={handleSignup}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleRegisterMessage={handleRegisterMessage}
                onSubmit={handleSignin}
              />
            }
          />
        </Routes>
        <Footer />
      </div>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name={"delete-photo"}
        title={"Вы уверены?"}
        submitText={"Да"}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <ToolTip
        image={popupImage}
        title={registerMessage}
        isOpen={infoTooltip}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
