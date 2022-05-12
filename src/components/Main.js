import avatar from '../images/avatar.png';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

import Card from './Card';

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar-wrapper">
          <img src={currentUser.avatar ? currentUser.avatar : avatar} alt="Аватар" className="profile__avatar" />
          <button title="Загрузить новый аватар" className="profile__edit-avatar-btn" onClick={props.onEditAvatarClick}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditProfileClick}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить" onClick={props.onAddPlaceClick}></button>
      </section>

      <section className="gallery content__gallery" aria-label="Галерея мест">
        <ul className="gallery__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              name={card.name}
              link={card.link}
              likes={card.likes}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};
export default Main;
