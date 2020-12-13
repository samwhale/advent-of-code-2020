import { readFile } from '../utils/read-file.js';

export const findDifferences = (
  set,
  currentJoltage = 0,
  { oneJoltDifferences = 0, threeJoltDifferences = 0 } = {}
) => {
  if (set.has(currentJoltage + 1)) {
    return findDifferences(set, currentJoltage + 1, {
      oneJoltDifferences: oneJoltDifferences + 1,
      threeJoltDifferences,
    });
  } else if (set.has(currentJoltage + 2)) {
    return findDifferences(set, currentJoltage + 2, { oneJoltDifferences, threeJoltDifferences });
  } else if (set.has(currentJoltage + 3)) {
    return findDifferences(set, currentJoltage + 3, {
      oneJoltDifferences,
      threeJoltDifferences: threeJoltDifferences + 1,
    });
  }

  return { oneJoltDifferences, threeJoltDifferences: threeJoltDifferences };
};

export const findNumArrangements = (data) => {
  const countArray = new Array(data.length).fill(0);
  countArray[0] = 1;

  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j <= 3; j++) {
      if (i >= j && data[i] - data[i - j] <= 3) {
        countArray[i] += countArray[i - j];
      }
    }
  }

  return countArray[countArray.length - 1];
};

export const day10 = () => {
  const day10Data = readFile('../data/day10.txt')
    .trim()
    .split('\n')
    .map((num) => parseInt(num, 10));
  day10Data.sort((a, b) => a - b);
  const max = day10Data[day10Data.length - 1];
  day10Data.push(max + 3);
  const day10Set = new Set(day10Data);

  const { oneJoltDifferences, threeJoltDifferences } = findDifferences(day10Set);
  const resultPart2 = findNumArrangements([0, ...day10Data]);

  console.log(`answer to part 1: ${oneJoltDifferences * threeJoltDifferences}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
