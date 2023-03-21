export const CharDropdown = (props) => {
  const { characters } = props;

  return (
    <div
      className="charDropdown"
      style={{ top: props.coords.y, left: props.coords.x }}
      onClick={props.chooseCharacter}
    >
      <img
        className="char"
        src={characters[0].img}
        data-name={characters[0].name}
      ></img>
      <img
        className="char"
        src={characters[1].img}
        data-name={characters[1].name}
      ></img>
      <img
        className="char"
        src={characters[2].img}
        data-name={characters[2].name}
      ></img>
    </div>
  );
};
