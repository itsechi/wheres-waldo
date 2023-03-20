import bg from "../assets/game.png";
import emily from "../assets/emily.png";
import elliott from "../assets/elliott.png";
import alex from "../assets/alex.png";
import { db } from "../firebase";
import { CharDropdown } from "./CharDropdown";
import React from "react";

import { query, getDocs, collection, where } from "firebase/firestore";

export const Gameboard = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const [dropdownCoords, setDropdownCoords] = React.useState({ x: 0, y: 0 });
  const [character, setCharacter] = React.useState({
    name: "",
    coords: { x: "", y: "" },
  });

  const relativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const relX = (x / e.target.offsetWidth).toFixed(2);
    const relY = (y / e.target.offsetHeight).toFixed(2);
    checkCoords(relX, relY, e);
    if (!e.target.classList.contains("charDropdown")) {
      setDropdownCoords({ x: x, y: y });
      setDropdown(!dropdown);
    }
  };

  const checkCoords = async (x, y) => {
    const coordsQuery = query(
      collection(db, "characters"),
      where("x", "in", [x, (+x + 0.01).toFixed(2), (+x - 0.01).toFixed(2)]),
      where("y", "in", [y, (+y + 0.01).toFixed(2), (+y - 0.01).toFixed(2)])
    );
    const querySnapshot = await getDocs(coordsQuery);
    const docs = querySnapshot.docs[0];
    if (!docs) return;
    const name = docs.id;
    const coords = docs.data();
    setCharacter({ name: name, coords: { x: coords.x, y: coords.y } });
  };

  const chooseCharacter = (e) => {
    const target = e.target.dataset.name;
    console.log(character);
    if (target === character.name) {
      console.log("found the character!");
      setCharacter({ name: "", coords: { x: "", y: "" } });
    }
  };

  return (
    <main className="game">
      <div className="characters">
        <img src={emily}></img>
        <img src={elliott}></img>
        <img src={alex}></img>
      </div>
      <div className="imgContainer" onClick={relativeCoords}>
        {dropdown && (
          <CharDropdown
            coords={dropdownCoords}
            alex={alex}
            elliott={elliott}
            emily={emily}
            chooseCharacter={chooseCharacter}
          />
        )}
        <img className="img" src={bg}></img>
      </div>
    </main>
  );
};
