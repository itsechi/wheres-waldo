import "./App.css";
import bg from "./assets/game.png";
import logo from "./assets/logo.png";
import char from "./assets/char.png";

export default function App() {
  const relativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    console.log((x / e.target.offsetWidth).toFixed(2));
    console.log("x:" + x, "y:" + y);
    // return {x: x, y: y};
  };

  return (
    <div>
      <div className="header">
        <img className="logo" src={logo}></img>
      </div>
      <div className="game">
        <div className="characters">
          <img src={char}></img>
          <img src={char}></img>
          <img src={char}></img>
        </div>
        <div className="imgContainer" onClick={relativeCoords}>
          <img className="img" src={bg}></img>
        </div>
      </div>
    </div>
  );
}
