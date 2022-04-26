import avatar from '../images/avatar.png';
import {useState, useEffect} from 'react';
import api from '../utils/Api';
import Card from './Card'

const Main = (props) => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getProfileData(), api.getInitialCards()])
    .then(([res, cardList]) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
      setCards(cardList);
      })
    .catch((err) => console.log(err));
  }, [])

  return (
    <>
      <main className="content">
        <section className="profile content__profile">
          <div className="profile__avatar-wrapper">
            <img src={userAvatar ? userAvatar : avatar} alt="Аватар" className="profile__avatar" />
            <button title="Загрузить новый аватар" className="profile__edit-avatar-btn" onClick={props.onEditAvatarClick}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-btn" type="button" aria-label="Редактировать" onClick={props.onEditProfileClick}></button>
            <p className="profile__job">{userDescription}</p>
          </div>
          <button className="profile__add-btn" type="button" aria-label="Добавить" onClick={props.onAddPlaceClick}></button>
        </section>

        <section className="gallery content__gallery" aria-label="Галерея мест">
          <ul className="gallery__list">
          {
            cards.map((card, id) => (
              <Card
                key={id}
                card={card}
                name={card.name}
                link={card.link}
                likes={card.likes}
                onCardClick={props.onCardClick}
              />
              )
            )
          }
          </ul>
        </section>



      </main>
    </>
  )
}
export default Main;
