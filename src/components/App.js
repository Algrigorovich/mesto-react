import {useState} from 'react';

import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }
  const hadleCardClick = (card) => {
    setSelectedCard(card);
  }
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header/>
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={hadleCardClick}
        />
        <Footer/>
        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <label htmlFor="avatar-link" className="popup-form__field">
                <input type="url" className="popup-form__input" required id="avatar-link" name="avatar-link"
                  placeholder="Ссылка на аватар"/>
                <span className="popup-form__input-error avatar-link-input-error popup-form__input-error_active">Ошибка</span>
              </label>
              <button className="popup-form__submit" type="submit">Сохранить</button>
            </>
          }
        />
        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <label htmlFor="name" className="popup-form__field">
                <input type="text" className="popup-form__input" id="name" name="name" placeholder="Имя" required minLength="2"
                  maxLength="40" />
                <span className="popup-form__input-error name-input-error">Ошибка</span>
              </label>
              <label htmlFor="about" className="popup-form__field">
                <input type="text" className="popup-form__input" id="about" name="info" placeholder="О себе" required
                  minLength="2" maxLength="200" />
                <span className="popup-form__input-error about-input-error">Ошибка</span>
              </label>
              <button className="popup-form__submit" type="submit">Сохранить</button>
            </>
          }
        />

        <PopupWithForm
          name="add-item"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <label htmlFor="card-title" className="popup-form__field">
                <input type="text" className="popup-form__input" required id="card-title" name="card-title"
                  placeholder="Название" minLength="2" maxLength="30" />
                <span className="popup-form__input-error card-title-input-error">Ошибка</span>
              </label>
              <label htmlFor="card-link" className="popup-form__field">
                <input type="url" className="popup-form__input" required id="card-link" name="card-link"
                  placeholder="Ссылка на картинку"/>
                <span className="popup-form__input-error card-link-input-error popup-form__input-error_active">Ошибка</span>
              </label>
              <button className="popup-form__submit" type="submit">Создать</button>
            </>
          }
        />

         <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          // isOpen={}
          // onClose={}
          children={
            <>
              <button className="popup-form__submit" type="submit">Да</button>
            </>
          }
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
