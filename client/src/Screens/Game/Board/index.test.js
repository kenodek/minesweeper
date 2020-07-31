import {
  generateCells,
  generateCellsData,
  mineRandomCells,
  checkIfCellIsOnEdgeOfBoard,
} from "./functions.ts";

test("generateCells", () => {
  const cells = generateCells(10, 10);
  let numberOfMinedCells = 0;
  let numberOfClickedCells = 0;

  for (let i = 0; i < 100; i++) {
    const { isMined, isClicked } = cells[i];
    if (isMined) numberOfMinedCells++;
    if (isClicked) numberOfClickedCells++;
  }

  expect(cells).toHaveLength(100);
  expect(cells[0]).toHaveProperty("isMined");
  expect(cells[0]).toHaveProperty("isClicked");
  expect(numberOfMinedCells).toBe(10);
  expect(numberOfClickedCells).toBe(0);
});

describe.only("generateCellsData", () => {
  test("100 cells", () => {
    const cells = generateCellsData(100);
    expect(cells).toHaveLength(100);
    expect(cells[0]).toHaveProperty("isMined", false);
    expect(cells[0]).toHaveProperty("isClicked", false);
    expect(cells[0]).toHaveProperty("numberOfMinedAdjacentCells", 0);
    expect(cells[0]).toHaveProperty("indexesOfAdjacentCells");
    expect(cells[0]).toHaveProperty("id");
  });

  test("60 cells", () => {
    const cells = generateCellsData(60);
    expect(cells).toHaveLength(60);
    expect(cells[0]).toHaveProperty("isMined", false);
    expect(cells[0]).toHaveProperty("isClicked", false);
    expect(cells[0]).toHaveProperty("numberOfMinedAdjacentCells", 0);
    expect(cells[0]).toHaveProperty("indexesOfAdjacentCells");
    expect(cells[0]).toHaveProperty("id");
  });
});

describe("checkIfCellIsOnEdgeOfBoard", () => {
  describe("width: 10, height: 10", () => {
    const boardHeight = 10;
    const boardWidth = 10;

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 0", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(0, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(true);
      expect(isCellFromFirstColumn).toBe(true);
      expect(isCellFromLastRow).toBe(false);
      expect(isCellFromLastColumn).toBe(false);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 9", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(9, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(true);
      expect(isCellFromFirstColumn).toBe(false);
      expect(isCellFromLastRow).toBe(false);
      expect(isCellFromLastColumn).toBe(true);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 90", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(90, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(false);
      expect(isCellFromFirstColumn).toBe(true);
      expect(isCellFromLastRow).toBe(true);
      expect(isCellFromLastColumn).toBe(false);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 99", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(99, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(false);
      expect(isCellFromFirstColumn).toBe(false);
      expect(isCellFromLastRow).toBe(true);
      expect(isCellFromLastColumn).toBe(true);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 1", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(1, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(true);
      expect(isCellFromFirstColumn).toBe(false);
      expect(isCellFromLastRow).toBe(false);
      expect(isCellFromLastColumn).toBe(false);
    });
  });

  describe("width: 4, height: 15", () => {
    const boardHeight = 15;
    const boardWidth = 4;

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 0", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(0, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(true);
      expect(isCellFromFirstColumn).toBe(true);
      expect(isCellFromLastRow).toBe(false);
      expect(isCellFromLastColumn).toBe(false);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 9", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(9, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(false);
      expect(isCellFromFirstColumn).toBe(false);
      expect(isCellFromLastRow).toBe(false);
      expect(isCellFromLastColumn).toBe(false);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 1", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(1, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(true);
      expect(isCellFromFirstColumn).toBe(false);
      expect(isCellFromLastRow).toBe(false);
      expect(isCellFromLastColumn).toBe(false);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 3", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(3, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(true);
      expect(isCellFromFirstColumn).toBe(false);
      expect(isCellFromLastRow).toBe(false);
      expect(isCellFromLastColumn).toBe(true);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 56", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(56, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(false);
      expect(isCellFromFirstColumn).toBe(true);
      expect(isCellFromLastRow).toBe(true);
      expect(isCellFromLastColumn).toBe(false);
    });

    test("checkIfCellIsOnEdgeOfBoard with indexOfCell = 59", () => {
      const {
        isCellFromFirstRow,
        isCellFromFirstColumn,
        isCellFromLastColumn,
        isCellFromLastRow,
      } = checkIfCellIsOnEdgeOfBoard(59, boardHeight, boardWidth);
      expect(isCellFromFirstRow).toBe(false);
      expect(isCellFromFirstColumn).toBe(false);
      expect(isCellFromLastRow).toBe(true);
      expect(isCellFromLastColumn).toBe(true);
    });
  });
});

describe.only("mineRandomCells", () => {
  test("First", () => {
    const basicCells = generateCellsData(40);
    const { cells, indexesOfMinedCells } = mineRandomCells(basicCells);
    expect(cells).toHaveLength(40);
    expect(indexesOfMinedCells).toHaveLength(10);
  });
});
