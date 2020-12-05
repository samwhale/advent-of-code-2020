import { getSeatId } from '../day5.js';

describe('getSeatId', () => {
  it('should calculate the correct seat id', () => {
    expect(getSeatId('BFFFBBFRRR')).toEqual(567);
    expect(getSeatId('FFFBBBFRRR')).toEqual(119);
    expect(getSeatId('BBFFBBFRLL')).toEqual(820);
  });
});
