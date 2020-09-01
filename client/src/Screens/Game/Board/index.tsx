import React, { useState, useEffect } from "react";
import "./index.scss";
import Cell from "../Cell";
import { useTypedSelector } from "../../../redux/store";
import { generateCells, ICell } from "./functions";

interface Props {
  isGameReseted: boolean;
  setIsGameReseted: Function;
}

function Board({ isGameReseted, setIsGameReseted }: Props) {
  const boardWidth = useTypedSelector((state) => state.board.width);
  const boardHeight = useTypedSelector((state) => state.board.height);
  const numberOfBombs = useTypedSelector((state) => state.board.numberOfBombs);

  const [cells, setCells] = useState(() =>
    generateCells(numberOfBombs, boardHeight, boardWidth)
  );
  const [isGameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (isGameReseted) {
      setCells(generateCells(numberOfBombs, boardHeight, boardWidth));
      setIsGameReseted(false);
    }
  }, [isGameReseted]);

  useEffect(() => {
    setCells(generateCells(numberOfBombs, boardHeight, boardWidth));
  }, [numberOfBombs, boardWidth, boardHeight]);

  const boardSideLength = {
    width: `${boardWidth * 40 + 2}px`,
    height: `${boardHeight * 40 + 2}px`,
  };

  const markAdjacentCellsAsClicked = (
    cells: ICell[],
    indexesOfAdjacentCells: number[]
  ) => {
    indexesOfAdjacentCells.forEach((indexOfCell) => {
      const adjacentCell = cells[indexOfCell];
      if (adjacentCell.isClicked) return;
      adjacentCell.isClicked = true;

      if (adjacentCell.numberOfMinedAdjacentCells !== 0) return;

      markAdjacentCellsAsClicked(cells, adjacentCell.indexesOfAdjacentCells);
    });
  };

  const handleCellClick = (index: number) => {
    const clickedCell = cells[index];

    if (clickedCell.isMined) {
      setGameOver(true);

      setCells((cells) => cells.map((cell) => ({ ...cell, isClicked: true })));
      return;
    }

    const newCells = cells.map((cell) => ({ ...cell }));
    newCells[index].isClicked = true;

    if (clickedCell.numberOfMinedAdjacentCells === 0) {
      markAdjacentCellsAsClicked(newCells, clickedCell.indexesOfAdjacentCells);
    }
    setCells(newCells);
  };

  return (
    <div id="container-board">
      <div id="board" style={boardSideLength}>
        {cells.map(
          ({ isMined, isClicked, numberOfMinedAdjacentCells, id }, index) => (
            <Cell
              key={id}
              index={index}
              isMined={isMined}
              isClicked={isClicked}
              numberOfMinedAdjacentCells={numberOfMinedAdjacentCells}
              handleClick={handleCellClick}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Board;
