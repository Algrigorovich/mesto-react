import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="popup-form__field">
        <input
          type="text"
          className="popup-form__input"
          id="name"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
        />
        <span className="popup-form__input-error name-input-error">Ошибка</span>
      </label>
      <label htmlFor="about" className="popup-form__field">
        <input
          type="text"
          className="popup-form__input"
          id="about"
          name="info"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeAbout}
        />
        <span className="popup-form__input-error about-input-error">Ошибка</span>
      </label>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
