import { readFile } from '../utils/read-file.js';

// almost works :(
const MATCHING_EXPRESSION = /(.)(.*)(?!\1)/g;

export const sumUniqueAnswers = (block) => {
  const ansSet = new Set(block.replace(/\n/g, '').split(''));

  return ansSet.size;
};

export const sumMatchingAnswers = (block) => {
  const sets = block
    .trim()
    .split(/\n/g)
    .map((ans) => new Set(ans.split('')));
  const intersectionSet = sets.reduce(
    (finalSet, set) => new Set([...set].filter(Set.prototype.has, finalSet))
  );

  return intersectionSet.size;
};

export const day6 = () => {
  const day6Data = readFile('../data/day6.txt').split('\n\n');
  const resultPart1 = day6Data.map(sumUniqueAnswers).reduce((a, b) => a + b);
  const resultPart2 = day6Data.map(sumMatchingAnswers).reduce((a, b) => a + b);

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
