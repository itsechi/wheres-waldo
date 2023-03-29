export const CharDropdown = (props) => {
  const { characters } = props;

  return (
    <div
      className="characterDropdown"
      style={{ top: props.coords.y, left: props.coords.x }}
      onClick={props.chooseCharacter}
    >
      {!characters[0].found && (
        <img
          className="character"
          src={characters[0].img}
          data-name={characters[0].name}
        ></img>
      )}
      {!characters[1].found && (
        <img
          className="character"
          src={characters[1].img}
          data-name={characters[1].name}
        ></img>
      )}
      {!characters[2].found && (
        <img
          className="character"
          src={characters[2].img}
          data-name={characters[2].name}
        ></img>
      )}
    </div>
  );
};
