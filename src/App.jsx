import './App.scss';
import React from 'react';
import { Header } from './components/Header';
import { Gameboard } from './components/Gameboard';
import { MenuScreen } from './components/MenuScreen';
import { generateCharacters } from './helpers/generateCharacters';

export default function App() {
  const [gameStart, setGameStart] = React.useState(false);
  const [characters, setCharacters] = React.useState([]);

  React.useEffect(() => {
    const finalCharacters = generateCharacters();
    setCharacters(finalCharacters);
  }, []);

  return (
    <>
      <Header />
      {gameStart ? (
        <Gameboard characters={characters} />
      ) : (
        <MenuScreen setGameStart={setGameStart} />
      )}
    </>
  );
}
