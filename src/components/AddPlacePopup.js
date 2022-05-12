import PopupWithForm from './PopupWithForm';
import {useState, useEffect} from 'react';
 const AddPlacePopup = (props) => {

  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setLink('');
    setName('');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-item"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <label htmlFor="card-title" className="popup-form__field">
        <input
          type="text"
          className="popup-form__input"
          required
          id="card-title"
          name="card-title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChangeName}
        />
        <span className="popup-form__input-error card-title-input-error">Ошибка</span>
      </label>
      <label htmlFor="card-link" className="popup-form__field">
        <input
          type="url"
          className="popup-form__input"
          required
          id="card-link"
          name="card-link"
          placeholder="Ссылка на картинку"
          onChange={handleChangeLink}
        />
        <span className="popup-form__input-error card-link-input-error popup-form__input-error_active">Ошибка</span>
      </label>
    </PopupWithForm>
  )
}
export default AddPlacePopup;
