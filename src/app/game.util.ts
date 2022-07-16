import { gridSize, emptyValue, GameState } from "./constants";

export function randomNewNumber(): number {
  return Math.random() < 0.5 ? 2 : 4;
}

export function getNextLocation(maxLocations: number): number {
  return Math.ceil(Math.random() * maxLocations);
}

export function setValueInGrid(
  grid: number[][],
  value: number,
  location: number
): number[][] {
  let counter = 0;
  return grid.map((row) =>
    row.map((val) => (val===emptyValue? (++counter === location ? value : val) : val)
  ));
}
function compact(row: number[]) {
  let current = 0;
  for (let y = 0; y < row.length; y++) {
    if (row[y] != -1) {
      if (current != y) {
        row[current] = row[y];
        row[y] = emptyValue;
      }
      current++;
    }
  }
}
function addSameNumber(row: number[]): number {
  let score = 0;
  for (let y = 0; y < row.length - 1; y++) {
    if (row[y] !== emptyValue && row[y + 1] !== emptyValue && row[y] === row[y + 1]) {
      row[y] = 2 * row[y];
      score += row[y];
      row[y + 1] = emptyValue;
    }
  }
  return score;
}
export interface RowMoveResult {
  row: number[];
  score: number;
}

export function moveRowLeft(row: number[]): RowMoveResult {
  const rv = [...row];
  compact(rv);
  const score = addSameNumber(rv);
  compact(rv);
  return { row: rv, score };
}

export function invertGrid(grid: number[][]): number[][] {
  return grid.map((row) => [...row].reverse());
}

export function transposeGrid(grid: number[][]): number[][] {
  const rv: number[][] = [];
  for (let x = 0; x < grid.length; x++) {
    rv.push([]);
    for (let y = 0; y < grid[x].length; y++) {
      rv[x].push(grid[y][x]);
    }
  }
  return rv;
}

export interface GridMoveResult {
  grid: number[][];
  score: number;
}

export function moveGridLeft(grid: number[][]): GridMoveResult {
  let score = 0;
  const output = grid.map((row) => {
    const result = moveRowLeft(row);
    score += result.score;
    return result.row;
  });

  return { grid: output, score };
}

export function moveGridRight(grid: number[][]): GridMoveResult {
  const result = moveGridLeft(invertGrid(grid));
  return { grid: invertGrid(result.grid), score: result.score };
}

export function moveGridUp(grid: number[][]): GridMoveResult {
  const result = moveGridLeft(transposeGrid(grid));
  return { grid: transposeGrid(result.grid), score: result.score };
}

export function moveGridDown(grid: number[][]): GridMoveResult {
  const result = moveGridLeft(invertGrid(transposeGrid(grid)));
  return { grid: transposeGrid(invertGrid(result.grid)), score: result.score };
}

export function countEmptyCells(grid: number[][]): number {
  return grid.reduce(
    (p, row) => p + row.reduce((i, cell) => (cell === emptyValue ? i + 1 : i), 0),
    0
  );
}

export function checkGameStatus(grid: number[][]): GameState {

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y]===emptyValue) {
        return GameState.inProgress;
      }
      if (grid[x][y]>=2048) {
        return GameState.won;
      }
      if (x < grid.length - 1 && grid[x][y] === grid[x + 1][y]) {
        return GameState.inProgress;
      }
      if (y < grid.length - 1 && grid[x][y] === grid[x][y + 1]) {
        return GameState.inProgress;
      }
    }
  }
  return GameState.lost;
}

export function setNextNumber(newGrid: number[][]): number[][] {
  const noEmptyCells=countEmptyCells(newGrid);
  if (noEmptyCells>0) {
    const nextNumber = randomNewNumber();
  const nextLocation = getNextLocation(noEmptyCells);
  return setValueInGrid(newGrid, nextNumber, nextLocation);
  }
  else{
    return newGrid;
  }

}

export function emptyGrid():number[][]{
  const grid:number[][] = [];
  for (let x = 0; x < gridSize; x++) {
    const row = []
    for (let y = 0; y < gridSize; y++) {
      row.push(emptyValue);
    }
    grid.push(row)
  }
  return grid;
}
