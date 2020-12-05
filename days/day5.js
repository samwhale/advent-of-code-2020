import { readFile } from '../utils/read-file.js';

export const binarySearch = (instructions, [min, max]) => {
  const bounds = instructions.split('').reduce(
    ([currentMin, currentMax], instruction) => {
      const midPoint = (currentMax - currentMin) / 2;

      if (instruction === 'F' || instruction === 'L') {
        return [currentMin, Math.floor(midPoint) + currentMin];
      } else if (instruction === 'B' || instruction === 'R') {
        return [Math.ceil(midPoint) + currentMin, currentMax];
      }

      throw new Error('bruh - not a valid row instruction');
    },
    [min, max]
  );

  if (instructions[-1] === 'F' || instructions[-1] === 'L') {
    return bounds[1];
  } else {
    return bounds[0];
  }
};

export const getSeatId = (instructions) => {
  const rowInstructions = instructions.slice(0, 7);
  const colInstructions = instructions.slice(7);

  const row = binarySearch(rowInstructions, [0, 127]);
  const col = binarySearch(colInstructions, [0, 8]);

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
