import './App.scss';
import React from 'react';
import { Header } from './components/Header';
import { Gameboard } from './components/Gameboard';
import { MenuScreen } from './components/MenuScreen';
import { ResultScreen } from './components/ResultScreen';
import { generateCharacters } from './helpers/generateCharacters';

export default function App() {
  const [gameStart, setGameStart] = React.useState(false);
  const [gameEnd, setGameEnd] = React.useState(false);
  const [characters, setCharacters] = React.useState([]);
  const [time, setTime] = React.useState({ start: 0, end: 0 });

  React.useEffect(() => {
    const finalCharacters = generateCharacters();
    setCharacters(finalCharacters);
  }, []);

  const setFound = (character) => {
    const updatedCharacters = characters.map((char) => {
      if (char.name === character.name && !char.found)
        return { ...char, found: true };
      else return char;
    });
    setCharacters(updatedCharacters);
  };

  return (
    <>
      <Header />
      {!gameStart && (
        <MenuScreen setGameStart={setGameStart} setTime={setTime} time={time} />
      )}
      {gameStart && !gameEnd && (
        <Gameboard
          characters={characters}
          setGameEnd={setGameEnd}
          setTime={setTime}
          time={time}
          setFound={setFound}
        />
      )}
      {gameEnd && <ResultScreen time={time} />}
      {/* {<ResultScreen Screen time={time} />} */}
    </>
  );
}
