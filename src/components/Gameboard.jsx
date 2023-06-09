import bg from '../assets/game.png';
import React from 'react';
import { db } from '../helpers/firebase';
import { CharDropdown } from './CharDropdown';
import { query, getDocs, collection, where } from 'firebase/firestore';
import { formatTime } from '../helpers/formatTime';

export const Gameboard = (props) => {
  const { characters } = props;
  const [dropdown, setDropdown] = React.useState(false);
  const [dropdownCoords, setDropdownCoords] = React.useState({});
  const [character, setCharacter] = React.useState({});
  const [time, setTime] = React.useState(0);
  const [imageStatus, setImageStatus] = React.useState({
    map: false,
    char1: false,
    char2: false,
    char3: false,
  });
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const changeImageStatus = (image) => {
    const images = { ...imageStatus, [image]: true };
    setImageStatus(images);
    if (Object.values(images).every((value) => value === true)) setLoaded(true);
  };

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
    props.setFound(character);
  };

  return (
    <main className={loaded ? 'game' : 'hidden'}>
      {characters.length > 0 && (
        <div className="characters">
          <img
            className={`${characters[0].found && 'found'}`}
            src={characters[0].img}
            onLoad={() => changeImageStatus('char1')}
          ></img>
          <img
            className={`${characters[1].found && 'found'}`}
            src={characters[1].img}
            onLoad={() => changeImageStatus('char2')}
          ></img>
          <img
            className={`${characters[2].found && 'found'}`}
            src={characters[2].img}
            onLoad={() => changeImageStatus('char3')}
          ></img>
        </div>
      )}
      <p className="timer">{formatTime(time)}</p>
      <div className="mapContainer" onClick={getRelativeCoords}>
        {dropdown && (
          <CharDropdown
            coords={dropdownCoords}
            characters={characters}
            chooseCharacter={chooseCharacter}
          />
        )}
        <img
          className="map"
          src={bg}
          onLoad={() => changeImageStatus('map')}
        ></img>
      </div>
    </main>
  );
};
