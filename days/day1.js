/* day 1 */
const { readFile } = require('../utils');

/**
 * Finds the first two entries that sum to `expectedResult`
 * 
 * @param {string[]} data The array
 * @param {number} expectedResult The array
 */
const findEntries = (data, expectedResult) => {
  const set = new Set(data);

  for (let value of set) {
    if (set.has(expectedResult - value)) {
      return [value, expectedResult - value];
    }
  }
  
  throw new Error('lmao what');
}

/**
 * Finds the first three entries that sum to `expectedResult`
 * 
 * @param {string[]} data The array
 * @param {number} expectedResult The array
 */
const findEntriesPart2 = (data, expectedResult) => {
  for (let i = 0; i < data.length; i++){
    for (let j = 0; j < data.length; j++) {
      for (let k = 0; k < data.length; k++) {
        const entry1 = data[i];
        const entry2 = data[j];
        const entry3 = data[k];

        if (i !== j && entry1 + entry2 + entry3 === expectedResult) {
          return [entry1, entry2, entry3];
        };
      };
    };
  };
  
  throw new Error('lmao what');
}

const day1 = (expectedResult = 2020) => {
  console.log('-- Day 1 --');
  const day1Data = readFile('../data/day1.txt')
    .split('\n')
    .map(entry => parseInt(entry));
  
  const result1 = findEntries(day1Data, expectedResult)
    .reduce((result, entry) => result * entry);
  const result2 = findEntriesPart2(day1Data, expectedResult)
    .reduce((result, entry) => result * entry);

  console.log(`answer to part 1: ${result1}`);
  console.log(`answer to part 2: ${result2}`);
  console.log('-- End --');
}

day1();

module.exports = {
  day1
} 