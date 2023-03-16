import "./App.css";
import bg from "./assets/game.png";
import logo from "./assets/logo.png";
import char from "./assets/char.png";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOkXWe2X7wgX8K3D5a44GLedUFRkP4UKY",
  authDomain: "whereswaldo-e790d.firebaseapp.com",
  projectId: "whereswaldo-e790d",
  storageBucket: "whereswaldo-e790d.appspot.com",
  messagingSenderId: "509700973374",
  appId: "1:509700973374:web:9f2bb3e14389ad26a3026f"
};

const app = initializeApp(firebaseConfig);

export default function App() {
  const relativeCoords = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    console.log('x: ' + (x / e.target.offsetWidth).toFixed(2));
    console.log('y: ' + (y / e.target.offsetHeight).toFixed(2));
    console.log("x:" + x, "y:" + y);
    // return {x: x, y: y};
  };

  return (
    <div>
      <div className="header">
        <img className="logo" src={logo}></img>
      </div>
      <div className="game">
        <div className="characters">
          <img src={char}></img>
          <img src={char}></img>
          <img src={char}></img>
        </div>
        <div className="imgContainer" onClick={relativeCoords}>
          <img className="img" src={bg}></img>
        </div>
      </div>
    </div>
  );
}


