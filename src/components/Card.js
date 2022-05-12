import trash from '../images/trash.svg';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `gallery-item__delete ${isOwn ? 'gallery-item__delete_visible' : 'gallery-item__delete_hidden'}`
  );
  const cardLikeButtonClassName = (
    `gallery-item__favourite ${isLiked ? 'gallery-item__favourite_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="gallery-item">
      <img alt={props.name} className="gallery-item__img" src={props.link} onClick={handleClick} />
      <img src={trash} className={cardDeleteButtonClassName} alt="Удалить" onClick={handleDeleteClick}/>
      <div className="gallery-item__footer">
        <h2 className="gallery-item__title">{props.name}</h2>
        <div className="gallery-item__likes-wrapper">
          <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк"  onClick={handleLikeClick}></button>
          <span className="gallery-item__like-counter">{props.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
