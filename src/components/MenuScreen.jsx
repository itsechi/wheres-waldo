export const MenuScreen = (props) => {
  return (
    <main>
      <button onClick={() => props.setStart(true)}>Start the game</button>
    </main>
  );
};
