export const MenuScreen = (props) => {
  return (
    <main className="startScreen">
      <p>Find the characters shown in the left upper corner.</p>
      <button onClick={() => props.setGameStart(true)}>
        Start the game
      </button>
    </main>
  );
};
