import bg from "../assets/game.png";
import char from "../assets/char.png";

export const Gameboard = () => {
  const relativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    console.log("x: " + (x / e.target.offsetWidth).toFixed(2));
    console.log("y: " + (y / e.target.offsetHeight).toFixed(2));
    console.log("x:" + x, "y:" + y);
    // return {x: x, y: y};
  };

  return (
    <main className="game">
      <div className="characters">
        <img src={char}></img>
        <img src={char}></img>
        <img src={char}></img>
      </div>
      <div className="imgContainer" onClick={relativeCoords}>
        <img className="img" src={bg}></img>
      </div>
    </main>
  );
};
