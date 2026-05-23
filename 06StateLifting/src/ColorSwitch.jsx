export const ColorSwitch = ({ handleChangeColor }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleChangeColor();
      }}
    >
      Change Color
    </button>
  );
};
