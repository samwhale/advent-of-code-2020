const { readFile } = require("../utils/index");

const CAPTURE_EXPRESSION = /^(\d+)-(\d+) (\w): (\w+)/;

const isValidPart1 = (min, max, char, password) => {
  const charRegexp = new RegExp(char, "g");
  const strippedPassword = password.match(charRegexp) || "";

  return strippedPassword.length >= min && strippedPassword.length <= max;
};

const isValidPart2 = (position1, position2, char, password) => {
  const position1HasChar = password[position1 - 1] === char;
  const position2HasChar = password[position2 - 1] === char;

  if (position1HasChar && position2HasChar) {
    return false;
  }

  return position1HasChar || position2HasChar;
};

const getNumCorrectPasswords = (data) => {
  let result1 = 0;
  let result2 = 0;

  data.forEach((line) => {
    const [_, num1, num2, char, password] = line.match(CAPTURE_EXPRESSION);

    if (isValidPart1(+num1, +num2, char, password)) {
      result1 += 1;
    }

    if (isValidPart2(+num1, +num2, char, password)) {
      result2 += 1;
    }
  });

  return { resultPart1: result1, resultPart2: result2 };
};

const day2 = () => {
  const day2Data = readFile("../data/day2.txt").trim().split("\n");
  const { resultPart1, resultPart2 } = getNumCorrectPasswords(day2Data);

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};

module.exports = {
  day2,
  getNumCorrectPasswords,
};
