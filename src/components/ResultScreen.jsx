import { formatTime } from '../helpers/formatTime';
import { collection, addDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../helpers/firebase';

export const ResultScreen = (props) => {
  const time = formatTime((props.time.end - props.time.start) / 1000);
  const [name, setName] = React.useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const submitName = async () => {
    const score = {
      name,
      time,
    };
    try {
      await addDoc(collection(db, 'leaderboard'), score);
    } catch (error) {
      console.error('Error saving cart items to Firebase Database', error);
    }
    setName('');
  };

  return (
    <main className="resultScreen">
      <p>You found all characters in {time}!</p>
      <p>Enter your name:</p>
      <input value={name} onChange={handleChange} type="text"></input>
      <button onClick={submitName}>Submit</button>
    </main>
  );
};
