import { Accumulator } from '../day8.js';

const TEST_DATA = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

describe('Accumulator', () => {
  it('should parse the data', () => {
    const accumulator = new Accumulator(TEST_DATA.split('\n'));
    expect(accumulator.instructions).toEqual([
      { instruction: 'nop', value: 0 },
      { instruction: 'acc', value: 1 },
      { instruction: 'jmp', value: 4 },
      { instruction: 'acc', value: 3 },
      { instruction: 'jmp', value: -3 },
      { instruction: 'acc', value: -99 },
      { instruction: 'acc', value: 1 },
      { instruction: 'jmp', value: -4 },
      { instruction: 'acc', value: 6 },
    ]);
  });

  it('should calculate the value from one loop of instruction', () => {
    const accumulator = new Accumulator(TEST_DATA.split('\n'));
    expect(accumulator.run().value).toEqual(5);
  });

  it('should find the index of the broken instruction', () => {
    const accumulator = new Accumulator(TEST_DATA.split('\n'));
    const { brokenInstructionLocation, value } = accumulator.runPart2();
    expect(brokenInstructionLocation).toEqual(7);
    expect(value).toEqual(8);
  });
});
