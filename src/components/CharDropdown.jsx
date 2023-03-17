export const CharDropdown = (props) => {
  return (
    <div
      className="charDropdown"
      style={{ top: props.coords.y, left: props.coords.x }}
    >
      <img className="char" src={props.emily}></img>
      <img className="char" src={props.elliott}></img>
      <img className="char" src={props.haley}></img>
    </div>
  );
};
