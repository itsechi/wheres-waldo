import bg from "../assets/game.png";
import emily from "../assets/emily.png";
import elliott from "../assets/elliott.png";
import haley from "../assets/haley.png";
import { db } from "../firebase";
import { CharDropdown } from "./CharDropdown";
import React from "react";

import { query, getDocs, collection, where } from "firebase/firestore";

export const Gameboard = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const [dropdownCoords, setDropdownCoords] = React.useState({ x: 0, y: 0 });

  const relativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const relX = (x / e.target.offsetWidth).toFixed(2);
    const relY = (y / e.target.offsetHeight).toFixed(2);
    checkCoords(relX, relY);
    if (!e.target.classList.contains("charDropdown")) {
      setDropdownCoords({ x: x, y: y });
      setDropdown(!dropdown);
    }
    console.log(e.target);
  };

  const checkCoords = async (x, y) => {
    const coordsQuery = query(
      collection(db, "characters"),
      where("x", "==", x),
      where("y", "==", y)
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
        {dropdown && (
          <CharDropdown
            coords={dropdownCoords}
            haley={haley}
            elliott={elliott}
            emily={emily}
          />
        )}
        <img className="img" src={bg}></img>
      </div>
    </main>
  );
};
