import { findEntries } from '../day1';

const TEST_DATA = new Set([1721, 979, 366, 299, 675, 1456]);

describe('findEntries', () => {
  it('should find the pair of numbers that adds up to the expected result', () => {
    expect(findEntries({ set: TEST_DATA, expectedResult: 2020 })).toEqual([1721, 299]);
  });

  it('should find n entries if specified', () => {
    expect(findEntries({ set: TEST_DATA, expectedResult: 2020, n: 3 })).toEqual([979, 366, 675]);
  });

  it('returns undefined if no solution was found', () => {
    expect(findEntries({ set: TEST_DATA, expectedResult: 2020, n: 10 })).toEqual([]);
  });
});
