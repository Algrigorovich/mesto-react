import React from 'react'
import PopupWithForm from './PopupWithForm';
import {useRef} from 'react';

 const EditAvatarPopup = (props) => {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
  >
    <label htmlFor="avatar-link" className="popup-form__field">
      <input
        type="url"
        className="popup-form__input"
        required
        id="avatar-link"
        name="avatar-link"
        placeholder="Ссылка на аватар"
        ref={inputRef}
      />
      <span className="popup-form__input-error avatar-link-input-error popup-form__input-error_active">Ошибка</span>
    </label>
  </PopupWithForm>
  )
}
export default EditAvatarPopup;
