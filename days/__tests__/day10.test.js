import { findDifferences, findNumArrangements } from '../day10.js';

const TEST_DATA = [
  1,
  2,
  3,
  4,
  7,
  8,
  9,
  10,
  11,
  14,
  17,
  18,
  19,
  20,
  23,
  24,
  25,
  28,
  31,
  32,
  33,
  34,
  35,
  38,
  39,
  42,
  45,
  46,
  47,
  48,
  49,
];

describe('findDifferences', () => {
  it('should calculate the number of  one and three jolt differences', () => {
    expect(findDifferences(new Set(TEST_DATA))).toEqual({
      oneJoltDifferences: 22,
      threeJoltDifferences: 9,
    });
  });
});

describe('findNumArrangements', () => {
  it('should calculate the number of possible arrangements', () => {
    const dataOne = [0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 22];
    const dataTwo = [0, ...TEST_DATA, TEST_DATA[TEST_DATA.length - 1] + 3];

    expect(findNumArrangements(dataOne)).toEqual(8);
    expect(findNumArrangements(dataTwo)).toEqual(19208);
  });
});
