import { readFile } from '../utils/read-file.js';

export const getSeatId = (instructions) => {
  let binaryInstructions = instructions.replace(/F|L/g, '0').replace(/B|R/g, '1');

  const row = parseInt(binaryInstructions.slice(0, 7), 2);
  const col = parseInt(binaryInstructions.slice(7), 2);

  return row * 8 + col;
};

export const findMySeat = (takenSeats, minSeat, maxSeat) => {
  const seatSet = new Set(takenSeats);

  for (let item of takenSeats) {
    const hasPrevEntry = seatSet.has(item - 1);
    const hasNextEntry = seatSet.has(item + 1);

    if (!hasPrevEntry && item !== minSeat) {
      return item - 1;
    } else if (!hasNextEntry && item !== maxSeat) {
      return item + 1;
    }
  }
};

export const day5 = () => {
  const day5Data = readFile('../data/day5.txt').trim().split('\n');

  const seatAssignments = day5Data.map(getSeatId);
  const maxSeat = Math.max(...seatAssignments);
  const minSeat = Math.max(...seatAssignments);

  const mySeat = findMySeat(seatAssignments, minSeat, maxSeat);

  console.log(`answer to part 1: ${maxSeat}`);
  console.log(`answer to part 2: ${mySeat}`);
};
