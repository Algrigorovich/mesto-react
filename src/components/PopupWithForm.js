const PopupWithForm = (props) => {

  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__container">
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          <form action="/" method="post" className="popup-form" name={props.name} id={`${props.name}-form`} noValidate>
            {props.children}
          </form>

        </div>
      </div>
    </>
  )
}
export default PopupWithForm;
