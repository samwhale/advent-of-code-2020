import { calculateNumTreesHit } from '../day3';

const TEST_DATA = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
];

describe('findEntries', () => {
  it('should find the number of correct passwords for part 1', () => {
    expect(calculateNumTreesHit({ slope: [3, 1], map: TEST_DATA })).toEqual(7);
  });
});
