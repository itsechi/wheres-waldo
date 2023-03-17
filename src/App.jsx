import "./App.css";
import { Header } from "./components/Header";
import { Gameboard } from "./components/Gameboard";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOkXWe2X7wgX8K3D5a44GLedUFRkP4UKY",
  authDomain: "whereswaldo-e790d.firebaseapp.com",
  projectId: "whereswaldo-e790d",
  storageBucket: "whereswaldo-e790d.appspot.com",
  messagingSenderId: "509700973374",
  appId: "1:509700973374:web:9f2bb3e14389ad26a3026f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const checkCoords = async (x, y) => {
  const coordsQuery = query(collection(db, "characters"), where("x", "==", x));
  const querySnapshot = await getDocs(coordsQuery);
  const docs = querySnapshot.docs[0];
  if (docs) {
    const character = docs.id;
    const coords = docs.data();
    console.log(character, coords);
  }
};

export default function App() {
  return (
    <>
      <Header />
      <Gameboard checkCoords={checkCoords} />
    </>
  );
}
