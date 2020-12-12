import { readFile } from '../utils/read-file.js';

const CAPTURE_EXPRESSION = /^(\w+) ([+|-]\d+)/;

const formatLine = (line) => {
  const match = line.match(CAPTURE_EXPRESSION);
  if (!match) throw new Error('Line could not be parsed');

  return { instruction: match[1], value: parseInt(match[2]) };
};

export class Accumulator {
  constructor(rawInstructions) {
    this.value = 0;
    this.instructionPointer = 0;
    this.visited = new Set();
    this.jmpAndNopLocations = [];
    this.instructions = rawInstructions.map((line, index) => {
      const { instruction, value } = formatLine(line);

      if (instruction === 'nop' || instruction === 'jmp') {
        this.jmpAndNopLocations.push(index);
      }

      return { instruction, value };
    });
  }

  reset() {
    this.value = 0;
    this.instructionPointer = 0;
    this.visited = new Set();
  }

  add(value) {
    this.value += value;
    this.instructionPointer += 1;
  }

  jump(value) {
    this.instructionPointer += value;
  }

  nop() {
    this.instructionPointer += 1;
  }

  run() {
    while (
      this.instructionPointer < this.instructions.length &&
      !this.visited.has(this.instructionPointer)
    ) {
      const { instruction, value } = this.instructions[this.instructionPointer];

      this.visited.add(this.instructionPointer);

      switch (instruction) {
        case 'acc':
          this.add(value);
          break;
        case 'jmp':
          this.jump(value);
          break;
        case 'nop':
          this.nop();
          break;
        default:
          throw new Error(`Invalid Operation: ${instruction}`);
      }
    }

    const result = { value: this.value, infiniteLoop: this.visited.has(this.instructionPointer) };

    this.reset();

    return result;
  }

  runPart2() {
    for (let i = 0; i < this.jmpAndNopLocations.length; i++) {
      const indexOfInstruction = this.jmpAndNopLocations[i];
      const line = this.instructions[indexOfInstruction];
      if (line.instruction === 'jmp') {
        line.instruction = 'nop';
      } else {
        line.instruction = 'jmp';
      }

      const { value, infiniteLoop } = this.run();

      if (!infiniteLoop) {
        return { value, infiniteLoop, brokenInstructionLocation: this.jmpAndNopLocations[i] };
      }

      if (line.instruction === 'jmp') {
        line.instruction = 'nop';
      } else {
        line.instruction = 'jmp';
      }
    }
  }
}

export const day8 = () => {
  const day8Data = readFile('../data/day8.txt').trim().split('\n');
  const accumulator = new Accumulator(day8Data);
  const resultPart1 = accumulator.run().value;
  const resultPart2 = accumulator.runPart2().value;

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
