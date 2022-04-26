import trash from '../images/trash.svg';

 const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="gallery-item">
      <img alt={props.name} className="gallery-item__img" src={props.link} onClick={handleClick}/>
      <img src={trash} className="gallery-item__delete" alt="Удалить"/>
      <div className="gallery-item__footer">
        <h2 className="gallery-item__title">{props.name}</h2>
        <div className="gallery-item__likes-wrapper">
          <button className="gallery-item__favourite" type="button" aria-label="Поставить лайк"></button>
          <span className="gallery-item__like-counter">{props.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;
