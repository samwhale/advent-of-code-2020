import { sumUniqueAnswers, sumMatchingAnswers } from '../day6.js';

const TEST_DATA_1 = 'abc';
const TEST_DATA_2 = 'a\nb\nc';
const TEST_DATA_3 = 'ab\nac';
const TEST_DATA_4 = 'a\na\na\na\n';
const TEST_DATA_5 = 'b';

describe('sumUniqueAnswers', () => {
  it('should count the number of unique answers in a block', () => {
    expect(sumUniqueAnswers(TEST_DATA_1)).toEqual(3);
    expect(sumUniqueAnswers(TEST_DATA_2)).toEqual(3);
    expect(sumUniqueAnswers(TEST_DATA_3)).toEqual(3);
    expect(sumUniqueAnswers(TEST_DATA_4)).toEqual(1);
  });
});

describe('sumMatchingAnswers', () => {
  it('should count the number of matching answers in a block', () => {
    expect(sumMatchingAnswers(TEST_DATA_1)).toEqual(3);
    expect(sumMatchingAnswers(TEST_DATA_2)).toEqual(0);
    expect(sumMatchingAnswers(TEST_DATA_3)).toEqual(1);
    expect(sumMatchingAnswers(TEST_DATA_4)).toEqual(1);
    expect(sumMatchingAnswers(TEST_DATA_5)).toEqual(1);
  });
});
