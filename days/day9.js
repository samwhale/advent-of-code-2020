import { readFile } from '../utils/read-file.js';

export const isEntryValid = (value, preamble) => {
  const preambleSet = new Set(preamble);

  return preamble.some((number) => preambleSet.has(value - number));
};

export const findFirstInvalidEntry = (data, preambleLength = 25) => {
  for (let i = preambleLength; i < data.length; i++) {
    const entry = data[i];
    const preamble = data.slice(i - preambleLength, i);

    if (!isEntryValid(entry, preamble)) {
      return entry;
    }
  }
};

export const findContiguousSet = (data, value) => {
  let currentSum = 0;
  let start = 0;
  let end = 1;

  while (start <= data.length && end <= data.length) {
    if (currentSum === 0) {
      currentSum = data.slice(start, end).reduce((a, b) => a + b, 0);
    }

    if (currentSum < value) {
      end += 1;
      currentSum += data[end - 1];
    } else if (currentSum > value) {
      start += 1;
      currentSum = 0;
    } else {
      console.log({ start, end, slice: data.slice(start, end) });
      return data.slice(start, end);
    }
  }

  throw new Error('could not find answer');
};

export const day9 = () => {
  const day9Data = readFile('../data/day9.txt')
    .trim()
    .split('\n')
    .map((value) => parseInt(value, 10));
  const resultPart1 = findFirstInvalidEntry(day9Data);
  const contiguousSet = findContiguousSet(day9Data, resultPart1);
  const resultPart2 = Math.max(...contiguousSet) + Math.min(...contiguousSet);

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
