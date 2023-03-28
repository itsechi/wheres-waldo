export const MenuScreen = (props) => {
  const startGame = () => {
    props.setGameStart(true);
    props.setTime({ ...props.time, start: Date.now() });
  };

  return (
    <main className="startScreen">
      <p>Find the characters shown in the left upper corner.</p>
      <button onClick={startGame}>Start the game</button>
    </main>
  );
};
