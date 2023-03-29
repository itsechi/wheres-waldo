import logo from '../assets/logo.png';

export const Header = (props) => {
  return (
    <header className="header">
      <img className="logo" src={logo} onClick={props.startAgain}></img>
    </header>
  );
};
