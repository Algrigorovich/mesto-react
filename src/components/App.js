import {useState, useEffect} from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileData()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateUser = ({name, about}) => {
    api.editProfile(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateAvatar = ({avatar}) => {
    api.updateAvatar(avatar)
    .then(() => {

      setCurrentUser({ ...currentUser, avatar });
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
      api.getInitialCards()
        .then((cardList) => {
          setCards(cardList);
        })
        .catch((err) => console.log(err));
    }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.setCardLike(card._id).then((newCard) => {
        console.log(newCard, 'newCard')
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      }).catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit({name,link}) {
    api.addCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const hadleCardClick = (card) => {
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={hadleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

          <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да"></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
