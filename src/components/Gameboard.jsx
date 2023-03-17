import bg from "../assets/game.png";
import emily from "../assets/emily.png";
import elliott from "../assets/elliott.png";
import haley from "../assets/haley.png";
import { db } from "../firebase";

import {
  query,
  getDocs,
  collection,
  where,
} from "firebase/firestore";

export const Gameboard = () => {
  const relativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const relX = (x / e.target.offsetWidth).toFixed(2);
    const relY = (y / e.target.offsetHeight).toFixed(2);
    checkCoords(relX, relY);
  };

  const checkCoords = async (x, y) => {
    const coordsQuery = query(
      collection(db, "characters"),
      where("x", "==", x)
    );
    const querySnapshot = await getDocs(coordsQuery);
    const docs = querySnapshot.docs[0];
    if (docs) {
      const character = docs.id;
      const coords = docs.data();
      console.log(character, coords);
    }
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
