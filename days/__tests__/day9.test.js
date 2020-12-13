import { findContiguousSet, findFirstInvalidEntry, isEntryValid } from '../day9.js';

const TEST_DATA = `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`
  .trim()
  .split('\n')
  .map((value) => parseInt(value, 10));

describe('isEntryValid', () => {
  test('valid entries', () => {
    expect(isEntryValid(40, [35, 20, 15, 25, 47])).toEqual(true);
  });

  test('invalid entries', () => {
    expect(isEntryValid(127, [95, 102, 117, 150, 182])).toEqual(false);
  });
});

describe('findFirstInvalidEntry', () => {
  expect(findFirstInvalidEntry(TEST_DATA, 5)).toEqual(127);
});

describe('findContiguousSet', () => {
  it('should find contiguous set that sums to value (if one exists)', () => {
    expect(findContiguousSet(TEST_DATA, 127)).toEqual([15, 25, 47, 40]);
  });

  it('should throw an error if no set is found', () => {
    expect(() => findContiguousSet(TEST_DATA, 1)).toThrowError();
  });
});
