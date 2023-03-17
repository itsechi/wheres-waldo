export const CharDropdown = (props) => {
  return (
    <div
      className="charDropdown"
      style={{ top: props.coords.y, left: props.coords.x }}
    >
      <img src={props.emily}></img>
      <img src={props.elliott}></img>
      <img src={props.haley}></img>
    </div>
  );
};
