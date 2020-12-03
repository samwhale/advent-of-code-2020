import { readFile } from "../utils/index.js";

/**
 *
 * @param {object} config The arguments to the fn
 *
 * @returns {array | undefined} array of length n
 */
export const findEntries = ({ set, expectedResult, nodes = [], n = 2 }) => {
  const target = nodes.reduce((a, b) => a - b, expectedResult);

  if (target <= 0 && nodes.length) {
    return [];
  }

  for (let elem of set) {
    if (n <= 2) {
      if (set.has(target - elem)) {
        return [elem, target - elem];
      }
    }

    if (n > 2) {
      const newSet = new Set(set);
      newSet.delete(elem);
      const result = findEntries({
        set: newSet,
        expectedResult,
        nodes: [...nodes, elem],
        n: n - 1,
      });

      if (result.length) {
        return [elem, ...result];
      }
    }
  }

  return [];
};

export const day1 = (expectedResult = 2020) => {
  const day1Data = readFile("../data/day1.txt")
    .split("\n")
    .map((entry) => parseInt(entry));
  const dataSet = new Set(day1Data);

  const result1 = findEntries({ set: dataSet, expectedResult }).reduce(
    (result, entry) => result * entry
  );
  const result2 = findEntries({
    set: dataSet,
    expectedResult,
    n: 3,
  }).reduce((result, entry) => result * entry);

  console.log(`answer to part 1: ${result1}`);
  console.log(`answer to part 2: ${result2}`);
};
