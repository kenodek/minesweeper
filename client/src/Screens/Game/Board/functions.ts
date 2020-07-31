import { v4 as uuidv4 } from "uuid";

export interface ICell {
    isMined: boolean;
    isClicked: boolean;
    numberOfMinedAdjacentCells: number;
    indexesOfAdjacentCells: number[];
    id: string;
  }
  
  export const checkIfCellIsOnEdgeOfBoard = (
    indexOfCell: number,
    boardHeight: number,
    boardWidth: number
  ) => {
    
    //Indexes starts from 0 which makes difficult these calculations
    return {
      isCellFromFirstRow: indexOfCell + 1 <= boardWidth,
      isCellFromLastRow: indexOfCell + 1 > boardWidth * boardHeight - boardWidth,
      isCellFromFirstColumn: (indexOfCell + 1) % boardWidth === 1,
      isCellFromLastColumn: (indexOfCell + 1) % boardWidth === 0,
    };
  };
  
  export const generateCellsData = (numberOfCells: number) => {
    return Array.from({ length: numberOfCells }).map((_, index) => ({
      isMined: false,
      isClicked: false,
      numberOfMinedAdjacentCells: 0,
      indexesOfAdjacentCells: [],
      id: uuidv4(),
    }));
  };
  
  export const mineRandomCells = (numberOfBombs:number, cells: ICell[]) => {
    const indexesOfMinedCells: number[] = [];
    while (indexesOfMinedCells.length < numberOfBombs) {
      const randomNumber = Math.floor(Math.random() * cells.length);
      if (!indexesOfMinedCells.includes(randomNumber))
        indexesOfMinedCells.push(randomNumber);
    }
  
    indexesOfMinedCells.forEach((indexOfMinedCell: number) => {
      cells[indexOfMinedCell].isMined = true;
    });
    return { cells, indexesOfMinedCells };
  };
  
  export const findIndexesOfAdjacentCells = (
    indexesOfCells: number[],
    boardHeight: number,
    boardWidth: number,
    cb: Function
  ): void => {
    indexesOfCells.forEach((indexOfCell: number) => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(indexOfCell, boardHeight, boardWidth);

      if (isCellFromFirstRow && isCellFromFirstColumn) {
        cb(indexOfCell, [
          indexOfCell + 1,
          indexOfCell + boardWidth,
          indexOfCell + boardWidth + 1,
        ]);
      } else if (isCellFromFirstRow && isCellFromLastColumn) {
        cb(indexOfCell, [
          indexOfCell - 1,
          indexOfCell + boardWidth,
          indexOfCell + boardWidth - 1,
        ]);
      } else if (isCellFromLastRow && isCellFromFirstColumn) {
        cb(indexOfCell, [
          indexOfCell + 1,
          indexOfCell - boardWidth,
          indexOfCell - boardWidth + 1,
        ]);
      } else if (isCellFromLastRow && isCellFromLastColumn) {
        cb(indexOfCell, [
          indexOfCell - 1,
          indexOfCell - boardWidth,
          indexOfCell - boardWidth - 1,
        ]);
      } else if (isCellFromFirstRow) {
        cb(indexOfCell, [
          indexOfCell - 1,
          indexOfCell + 1,
          indexOfCell + boardWidth,
          indexOfCell + boardWidth + 1,
          indexOfCell + boardWidth - 1,
        ]);
      } else if (isCellFromLastRow) {
        cb(indexOfCell, [
          indexOfCell - 1,
          indexOfCell + 1,
          indexOfCell - boardWidth,
          indexOfCell - boardWidth - 1,
          indexOfCell - boardWidth + 1,
        ]);
      } else if (isCellFromFirstColumn) {
        cb(indexOfCell, [
          indexOfCell + 1,
          indexOfCell - boardWidth,
          indexOfCell - boardWidth + 1,
          indexOfCell + boardWidth,
          indexOfCell + boardWidth + 1,
        ]);
      } else if (isCellFromLastColumn) {
        cb(indexOfCell, [
          indexOfCell - 1,
          indexOfCell - boardWidth,
          indexOfCell - boardWidth - 1,
          indexOfCell + boardWidth,
          indexOfCell + boardWidth - 1,
        ]);
      } else {
        cb(indexOfCell, [
          indexOfCell - 1,
          indexOfCell + 1,
          indexOfCell - boardWidth,
          indexOfCell - boardWidth - 1,
          indexOfCell - boardWidth + 1,
          indexOfCell + boardWidth,
          indexOfCell + boardWidth - 1,
          indexOfCell + boardWidth + 1,
        ]);
      }
    });
  };
  
  export const generateCells = (numberOfBombs:number, boardHeight: number, boardWidth: number) => {
    const numberOfCells = boardHeight * boardWidth;
    const basicCells = generateCellsData(numberOfCells);
  
    const { cells, indexesOfMinedCells } = mineRandomCells(numberOfBombs, basicCells);
  
    const notifyAdjacentCellsAboutBomb = (
      indexOfCell: number,
      indexesOfAdjacentCells: number[]
    ) => {
      indexesOfAdjacentCells.forEach((index) => {
        cells[index].numberOfMinedAdjacentCells++;
      });
    };
  
    const addInfoAboutAdjacentCells = (
      indexOfCell: number,
      indexesOfAdjacentCells: number[]
    ) => {
      cells[indexOfCell].indexesOfAdjacentCells = indexesOfAdjacentCells;
    };
  
    findIndexesOfAdjacentCells(
      indexesOfMinedCells,
      boardHeight,
      boardWidth,
      notifyAdjacentCellsAboutBomb
    );
  
    findIndexesOfAdjacentCells(
      cells.map((_, i) => i),
      boardHeight,
      boardWidth,
      addInfoAboutAdjacentCells
    );
  
    return cells;
  };