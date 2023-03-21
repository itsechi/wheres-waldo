import bg from "../assets/game.png";
import { db } from "../firebase";
import { CharDropdown } from "./CharDropdown";
import React from "react";
import { query, getDocs, collection, where } from "firebase/firestore";

export const Gameboard = (props) => {
  const [dropdown, setDropdown] = React.useState(false);
  const [dropdownCoords, setDropdownCoords] = React.useState({ x: 0, y: 0 });
  const [character, setCharacter] = React.useState({
    name: "",
    coords: { x: "", y: "" },
  });
  const { characters } = props;

  const getRelativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const relX = (x / e.target.offsetWidth).toFixed(2);
    const relY = (y / e.target.offsetHeight).toFixed(2);
    if (e.target.classList.contains("charDropdown")) return;
    checkCoords(relX, relY, e);
    setDropdownCoords({ x: x, y: y });
    setDropdown(!dropdown);
    setCharacter({ name: "", coords: { x: "", y: "" } });
  };

  const checkCoords = async (x, y) => {
    console.log(x, y);
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
    console.log(docs.id);
  };

  const chooseCharacter = (e) => {
    if (e.target.classList.contains("charDropdown")) return;
    const target = e.target.dataset.name;
    console.log(target);
    if (target !== character.name) return;
    const characterID = character.name;
    document.getElementById(characterID).classList.add("found");
  };

  return (
    <main className="game">
      {characters.length > 0 && (
        <div className="characters">
          <img id={characters[0].name} src={characters[0].img}></img>
          <img id={characters[1].name} src={characters[1].img}></img>
          <img id={characters[2].name} src={characters[2].img}></img>
        </div>
      )}
      <div className="imgContainer" onClick={getRelativeCoords}>
        {dropdown && (
          <CharDropdown
            coords={dropdownCoords}
            characters={characters}
            chooseCharacter={chooseCharacter}
          />
        )}
        <img className="img" src={bg}></img>
      </div>
    </main>
  );
};
