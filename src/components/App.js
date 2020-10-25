import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import Login from "./Login";
import Register from "./Register";
import InfoToolotip from "./InfoTooltip";
import accessImage from "../images/Union.jpg";
import errorImage from "../images/Union2.jpg";
import * as auth from "../utils/auth";
import api from "../utils/api.js";
import CurrentUserContext from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [isOpenImage, setIsOpenImage] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [InfoTooltipData, setInfoTooltipData] = React.useState({});
  const [userData, setUserData] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardDeleteClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPopupOpen(true);
  }
  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsAddPopupOpen(false);
    setSelectedCard(false);
    setIsOpenImage(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltip(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsOpenImage(true);
  }
  function openTooltip() {
    setIsInfoTooltip(true);
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCardData(card._id)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== card._id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(input) {
    api
      .saveUserData(input)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(input) {
    api
      .changeAvatar(input.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(input) {
    api
      .saveCardData(input)
      .then((res) => {
        setCards([...cards, res]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleReg(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoTooltipData({
          text: "Вы успешно зарегистрировались!",
          image: accessImage,
        });
        history.push("/sign-in");
      })
      .catch(() => {
        setInfoTooltipData({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          image: errorImage,
        });
      });
    openTooltip();
  }

  function handleLogin(email, password) {
    auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          setUserData(email);
          setLoggedIn(true);
          setInfoTooltipData({
            text: "Вы вошли",
            image: accessImage,
          });
          openTooltip();
          history.push("/");
        } else {
          setInfoTooltipData({
            text: "Что-то пошло не так! Попробуйте ещё раз.",
            image: errorImage,
          });
        }
      })
      .catch((err) => {
        setInfoTooltipData({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          image: errorImage,
        });
        openTooltip();
        console.log(err);
      });
  }

  function signOut() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  function checkToken() {
    let token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token).then((res) => {
        if (res) {
          console.log(res);
          setUserData(res.data.email);
          setLoggedIn(true);

          history.push("/");
        } else {
          console.log(res);
          setInfoTooltipData({
            message: "Что-то пошло не так! Попробуйте ещё раз.",
            icon: errorImage,
          });
          openTooltip();
        }
      });
    }
  }
  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userData={userData} onSignOut={signOut} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            onConfirmDelete={handleCardDeleteClick}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register handleReg={handleReg} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnText={"Да"}
          close={closeAllPopups}
        />
        <InfoToolotip
          isOpen={isInfoTooltip}
          close={closeAllPopups}
          image={InfoTooltipData.image}
          text={InfoTooltipData.text}
        />

        {isOpenImage && (
          <ImagePopup close={closeAllPopups} card={selectedCard} />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
