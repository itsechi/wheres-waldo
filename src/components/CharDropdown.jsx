export const CharDropdown = (props) => {

  return (
    <div
      className="charDropdown"
      style={{ top: props.coords.y, left: props.coords.x }}
      onClick={props.chooseCharacter}
    >
      <img className="char" src={props.emily} data-name="emily"></img>
      <img className="char" src={props.elliott} data-name="elliott"></img>
      <img className="char" src={props.alex} data-name="alex"></img>
    </div>
  );
};
