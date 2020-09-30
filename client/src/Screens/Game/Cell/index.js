import React from "react";
import "./index.scss";

const CELL_BACKGROUND_COLORS = {
  UNCLICKED: "#232124",
  CLICKED: "#323134",
};

const CELL_FONT_COLORS = {
  1: "#ffe082",
  2: "#ffb74d",
  3: "#c75b39",
  4: "#c41c00",
  5: "#b91400",
  6: "#ac0800",
  7: "#9f0000",
  8: "#870000",
};

const Cell = ({
  index,
  isMined,
  isClicked,
  handleClick,
  numberOfMinedAdjacentCells,
}) => {
  return (
    <button
      disabled={isClicked}
      className="cell flex-center"
      style={{
        backgroundColor: isClicked
          ? CELL_BACKGROUND_COLORS.CLICKED
          : CELL_BACKGROUND_COLORS.UNCLICKED,
        color: isMined ? "white" : CELL_FONT_COLORS[numberOfMinedAdjacentCells],
      }}
      onClick={() => handleClick(index)}
    >
      {!isMined &&
        isClicked &&
        numberOfMinedAdjacentCells !== 0 &&
        numberOfMinedAdjacentCells}

      {isMined && isClicked && "X"}
    </button>
  );
};

export default Cell;
