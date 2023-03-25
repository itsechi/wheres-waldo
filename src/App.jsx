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
  const charactersFound = characters.map((char) => {
    return {
      name: char.name,
      found: false,
    };
  });

  React.useEffect(() => {
    const finalCharacters = generateCharacters();
    setCharacters(finalCharacters);
  }, []);

  return (
    <>
      <Header />
      {!gameStart && <MenuScreen setGameStart={setGameStart} />}
      {gameStart && !gameEnd && (
        <Gameboard
          characters={characters}
          charactersFound={charactersFound}
          setGameEnd={setGameEnd}
        />
      )}
      {gameEnd && <ResultScreen />}
    </>
  );
}
