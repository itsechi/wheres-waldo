import bg from "../assets/game.png";
import emily from "../assets/emily.png";
import elliott from "../assets/elliott.png";
import haley from "../assets/haley.png";

export const Gameboard = (props) => {
  const relativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const relX = (x / e.target.offsetWidth).toFixed(2);
    const relY = (y / e.target.offsetHeight).toFixed(2);
    props.checkCoords(relX, relY);
  };

  return (
    <main className="game">
      <div className="characters">
        <img src={emily}></img>
        <img src={elliott}></img>
        <img src={haley}></img>
      </div>
      <div className="imgContainer" onClick={relativeCoords}>
        <img className="img" src={bg}></img>
      </div>
    </main>
  );
};
