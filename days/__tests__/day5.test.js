import { binarySearch, getSeatId } from '../day5.js';

describe('binarySearch', () => {
  it('should find the correct row', () => {
    expect(binarySearch('FBFBBFF', [0, 127])).toEqual(44);
  });

  it('should find the correct column', () => {
    expect(binarySearch('RLR', [0, 8])).toEqual(5);
  });
});

describe('getSeatId', () => {
  it('should calculate the correct seat id', () => {
    expect(getSeatId('BFFFBBFRRR')).toEqual(567);
    expect(getSeatId('FFFBBBFRRR')).toEqual(119);
    expect(getSeatId('BBFFBBFRLL')).toEqual(820);
  });
});
