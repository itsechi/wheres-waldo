export const MenuScreen = (props) => {
  return (
    <main>
      <button onClick={() => props.setGameStart(true)}>Start the game</button>
    </main>
  );
};
