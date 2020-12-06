import { readFile } from '../utils/read-file.js';

export const getSeatId = (instructions) => {
  const binaryInstructions = instructions.replace(/F|L/g, '0').replace(/B|R/g, '1');

  const row = parseInt(binaryInstructions.slice(0, 7), 2);
  const col = parseInt(binaryInstructions.slice(7), 2);

  return row * 8 + col;
};

export const findMySeat = (takenSeats) => {
  const seatSet = new Set(takenSeats);

  for (let item of seatSet) {
    if (!seatSet.has(item + 1) && seatSet.has(item + 2)) {
      return item + 1;
    }
  }

  throw new Error('Every seat is taken.');
};

export const day5 = () => {
  const day5Data = readFile('../data/day5.txt').trim().split('\n');

  const seatAssignments = day5Data.map(getSeatId);
  const resultPart1 = Math.max(...seatAssignments);

  const mySeat = findMySeat(seatAssignments);

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${mySeat}`);
};
