import { formatTime } from '../helpers/formatTime';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import React from 'react';
import { db } from '../helpers/firebase';

export const ResultScreen = (props) => {
  const time = formatTime((props.time.end - props.time.start) / 1000);
  const [name, setName] = React.useState('');
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const submitName = async () => {
    if (!name) return setError(true);
    if (name.length >= 1) setError(false);
    const score = {
      name,
      time,
    };
    try {
      await addDoc(collection(db, 'leaderboard'), score);
    } catch (error) {
      console.error('Error saving score to Firebase Database', error);
    }
    setName('');
    getLeaderboard();
    setSubmitted(true);
  };

  const getLeaderboard = async () => {
    let arr = [];
    const qr = query(collection(db, 'leaderboard'), orderBy('time'));

    const querySnapshot = await getDocs(qr);
    querySnapshot.forEach((doc) => {
      const score = doc.data();
      arr.push(score);
      setLeaderboard(arr);
    });
  };

  const displayLiderboard = leaderboard.map((score, i) => {
    return (
      <li className="score" key={i}>
        <span className="scoreName">{score.name}</span>
        {` => ${score.time}`}
      </li>
    );
  });

  return (
    <main className="resultScreen">
      <p>You found all characters in {time}!</p>
      {!submitted && (
        <>
          <p>Enter your name:</p>
          <input value={name} onChange={handleChange} type="text"></input>
          {error && (
            <p className="error">Must enter a name before submitting!</p>
          )}
          <button className="submitBtn" onClick={submitName}>
            Submit
          </button>
        </>
      )}
      <button onClick={props.startAgain}>Play again</button>
      <section className="leaderboard">
        <ol>{displayLiderboard}</ol>
      </section>
    </main>
  );
};
