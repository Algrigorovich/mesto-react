const ImagePopup = (props) => {
  return (
    <div className={`popup popup_type_fullscreen-img ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''} className="popup__img" />
        <p className="popup__img-name">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
};
export default ImagePopup;
