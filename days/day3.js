import { readFile } from '../utils/index.js';

export const calculateNumTreesHit = ({ position: { x, y } = { x: 0, y: 0 }, slope, map }) => {
  if (map.length <= y) {
    return 0;
  }

  const lineLen = map[y].length;
  const hitTree = map[y][x % lineLen] === '#';

  return (
    (hitTree ? 1 : 0) +
    calculateNumTreesHit({ position: { x: x + slope[0], y: y + slope[1] }, slope, map })
  );
};

export const day3 = () => {
  const day3Data = readFile('../data/day3.txt').trim().split('\n');
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const resultPart1 = calculateNumTreesHit({ map: day3Data, slope: [3, 1] });
  const resultPart2 = slopes
    .map((slope) => calculateNumTreesHit({ map: day3Data, slope }))
    .reduce((a, b) => a * b);

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
