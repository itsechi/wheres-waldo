import bg from '../assets/game.png';
import React from 'react';
import { db } from '../helpers/firebase';
import { CharDropdown } from './CharDropdown';
import { query, getDocs, collection, where } from 'firebase/firestore';

export const Gameboard = (props) => {
  const { characters } = props;
  const [dropdown, setDropdown] = React.useState(false);
  const [dropdownCoords, setDropdownCoords] = React.useState({});
  const [character, setCharacter] = React.useState({});

  const getRelativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const relX = (x / e.target.offsetWidth).toFixed(2);
    const relY = (y / e.target.offsetHeight).toFixed(2);
    if (e.target.classList.contains('charDropdown')) return;
    if (!e.target.classList.contains('char')) {
      checkCoords(relX, relY, e);
      setDropdownCoords({ x: x, y: y });
      setCharacter({ name: '', coords: { x: '', y: '' } });
    }
    setDropdown(!dropdown);
  };

  const checkCoords = async (x, y) => {
    const coordsQuery = query(
      collection(db, 'characters'),
      where('x', 'in', [x, (+x + 0.01).toFixed(2), (+x - 0.01).toFixed(2)]),
      where('y', 'in', [y, (+y + 0.01).toFixed(2), (+y - 0.01).toFixed(2)])
    );
    const querySnapshot = await getDocs(coordsQuery);
    const docs = querySnapshot.docs[0];
    if (!docs) return;
    const name = docs.id;
    const coords = docs.data();
    setCharacter({ name: name, coords: { x: coords.x, y: coords.y } });
  };

  const chooseCharacter = (e) => {
    if (e.target.classList.contains('charDropdown')) return;
    const target = e.target.dataset.name;
    if (target !== character.name) return;
    document.getElementById(character.name).classList.add('found');
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
