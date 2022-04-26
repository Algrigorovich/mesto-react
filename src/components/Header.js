import logo from '../images/logo.svg';

const Header = () => {
  return (
    <header className="header page__header">
      <a href="/" className="logo">
        <img className="logo__img" src={logo} alt="Логотип"/>
      </a>
    </header>
  )
}
export default Header;
