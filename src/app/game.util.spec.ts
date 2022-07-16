import { emptyValue, GameState } from './constants';
import {
  checkGameStatus,
  countEmptyCells,
  invertGrid,
  moveGridDown,
  moveGridLeft,
  moveGridRight,
  moveGridUp,
  moveRowLeft,
  setValueInGrid,
  transposeGrid,
} from './game.util';

function check2dArrayEquals(result:number[][],expected:number[][]){
  result.forEach((array1, x) =>
  array1.forEach((value, y) =>
  expect(value)
  .withContext(` Item at ${x},${y} is expected to be ${expected[x][y]} but was found to be ${value} `)
  .toEqual( expected[x][y])
  ));
}
describe('Util tests', () =>{
[
  { input: [2, 4], output: [2, 4], score: 0 },
  { input: [2, 2], output: [4, emptyValue], score: 4 },
  { input: [4, emptyValue], output: [4, emptyValue], score: 0 },
  { input: [emptyValue, 4], output: [4, emptyValue], score: 0 },
  { input: [emptyValue, emptyValue, 4], output: [4, emptyValue, emptyValue], score: 0 },
  { input: [4, emptyValue, 4, emptyValue], output: [8, emptyValue, emptyValue, emptyValue], score: 8 },
  { input: [4, 4, 4, 4], output: [8, 8, emptyValue, emptyValue], score: 16 },
].map(({ input, output, score }, index) =>
  it(`moveRowLeft ${index}`, () => {
    const result = moveRowLeft(input);
    result.row.forEach((value, index) =>
    expect(value)
    .withContext(`Item at ${index} is expected to be ${output[index]} but was found to be ${value}`)
    .toEqual( output[index])
    );
    expect(result.score)
    .withContext(`Score is expected to be ${score} but was found as ${result.score}`)
    .toEqual( score);
  })
);

[
  {
    input: [
      [1, 2],
      [3, 4],
    ],
    output: [
      [1, 3],
      [2, 4],
    ],
  },
  {
    input: [
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
      [41, 42, 43, 44],
    ],
    output: [
      [11, 21, 31, 41],
      [12, 22, 32, 42],
      [13, 23, 33, 43],
      [14, 24, 34, 44],
    ],
  },
].map(({ input, output }, index) =>
  it(`transposeGrid ${index}`, () => {
    const result = transposeGrid(input);
    check2dArrayEquals(result,output)
  })
);

[
  {
    input: [
      [1, 2],
      [3, 4],
    ],
    output: [
      [2, 1],
      [4, 3],
    ],
  },
].map(({ input, output }, index) =>
  it(`invertGrid ${index}`, () => {
    const result = invertGrid(input);
    check2dArrayEquals(result,output)
  })
);

[
  {
    input: [
      [2, 2],
      [8, 4],
    ],
    output: [
      [4, emptyValue],
      [8, 4],
    ],
    score: 4,
  },
].map(({ input, output, score }, index) =>
  it(`moveGridLeft ${index}`, () => {
    const result = moveGridLeft(input);
    check2dArrayEquals(result.grid,output);
    expect(result.score)
    .withContext(`Score is expected to be ${score} but was found as ${result.score}`)
    .toEqual( score);
  })
);

[
  {
    input: [
      [2, 2],
      [8, 4],
    ],
    output: [
      [emptyValue, 4],
      [8, 4],
    ],
  },
].map(({ input, output }, index) =>
  it(`moveGridRight ${index}`, () => {
    const result = moveGridRight(input);
    check2dArrayEquals(result.grid,output);
  })
);

[
  {
    input: [
      [2, 8],
      [2, 4],
    ],
    output: [
      [4, 8],
      [emptyValue, 4],
    ],
  },
].map(({ input, output }, index) =>
  it(`moveGridUp ${index}`, () => {
    const result = moveGridUp(input);
    check2dArrayEquals(result.grid,output);
  })
);

[
  {
    input: [
      [2, 8],
      [2, 4],
    ],
    output: [
      [emptyValue, 8],
      [4, 4],
    ],
  },
].map(({ input, output }, index) =>
  it(`moveGridDown ${index}`, () => {
    const result = moveGridDown(input);
    check2dArrayEquals(result.grid,output);
  })
);

[
  {
    input: [
      [2, emptyValue],
      [2, 4],
    ],
    output: 1,
  },
  {
    input: [
      [emptyValue, 8],
      [emptyValue, emptyValue],
    ],
    output: 3,
  },
].map(({ input, output }, index) =>
  it(`countEmptyCells ${index}`, () => {
    const result = countEmptyCells(input);
    expect(result)
    .withContext(`Result expected to be ${output} but was found to be ${result}`)
    .toEqual( output);
  })
);

[
  {
    input: {
      grid: [
        [emptyValue, 8],
        [emptyValue, emptyValue],
      ],
      location: 2,
      value: 4,
    },
    output: [
      [emptyValue, 8],
      [4, emptyValue],
    ],
  },
].map(({ input, output }, index) =>
  it(`setValueInGrid ${index}`, () => {
    const result = setValueInGrid(input.grid, input.value, input.location);
    check2dArrayEquals(result,output);
  })
);

[
  {
    input: [
      [2, 16, 4, 8],
      [32, 2, 16, 2],
      [2, 16, 4, 8],
      [32, 2, 16, 2],
    ],
    output: GameState.lost,
  },
  {
    input: [
      [2, 16, 4, 8],
      [32, 2048, 16, 2],
      [2, 16, 4, 8],
      [32, 2, 16, emptyValue],
    ],
    output: GameState.won,
  },
  {
    input: [
      [2, 16, 4, 8],
      [32, 2048, 16, 2],
      [2, 16, 4, 8],
      [32, 2, 16, 2],
    ],
    output: GameState.won,
  },
  {
    input: [
      [2, 16, 4, 8],
      [32, 2, 16, 2],
      [2, 16, 4, 8],
      [32, 2, 16, emptyValue],
    ],
    output: GameState.inProgress,
  },
  {
    input: [
      [2, 16, 4, 8],
      [32, 2, 16, 2],
      [2, 16, 4, 8],
      [32, 2, 16, 8],
    ],
    output: GameState.inProgress,
  },
  {
    input: [
      [2, 16, 4, 8],
      [32, 2, 16, 2],
      [2, 16, 4, 16],
      [32, 2, 8, 8],
    ],
    output: GameState.inProgress,
  },
].map(({ input, output }, index) =>
  it(`hasMoreMoves ${index}`, () => {
    const result = checkGameStatus(input);
    expect(result)
    .withContext(`Result expected to be ${output} but was found to be ${result}`)
    .toEqual( output);
  })
);
});
