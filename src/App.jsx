import "./App.css";
import { Header } from "./components/Header";
import { Gameboard } from "./components/Gameboard";
import { MenuScreen } from "./components/MenuScreen";
import React from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function App() {
  const [start, setStart] = React.useState(false);
  const [characters, setCharacters] = React.useState([]);

  React.useEffect(() => {
    const charactersArr = [
      "abigail",
      "alex",
      "caroline",
      "clint",
      "demetrius",
      "elliott",
      "emily",
      "george",
    ];

    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    const chars = shuffle(charactersArr).slice(0, 3);
    const newArr = [];
    const storage = getStorage();
    chars.forEach((char) => {
      const pathReference = ref(storage, `${char}.png`);
      getDownloadURL(pathReference).then((url) =>
        newArr.push({
          name: char,
          img: url,
        })
      );
    });

    setCharacters(newArr);
  }, []);

  return (
    <>
      <Header />
      {start ? (
        <Gameboard characters={characters} />
      ) : (
        <MenuScreen setStart={setStart} />
      )}
    </>
  );
}
