const { readFile }= require("../utils/index");

const CAPTURE_EXPRESSION = /^(\d+)-(\d+) (\w): (\w+)/;

const getNumCorrectPasswords = (data) =>
  data.reduce((numValid, line) => {
    const match = line.match(CAPTURE_EXPRESSION);

    const [_, min, max, char, password] = match;
    const charRegexp = new RegExp(char, "g");
    const strippedPassword = password.match(charRegexp) || "";

    if (strippedPassword.length >= +min && strippedPassword.length <= +max) {
      numValid += 1;
    }

    return numValid;
  }, 0);

const day2 = () => {
  const day2Data = readFile("../data/day2.txt").trim().split("\n");
  const numCorrectPasswords = getNumCorrectPasswords(day2Data);

  console.log(`answer to part 1: ${numCorrectPasswords}`);
  console.log(`answer to part 2:`);
};

module.exports = {
  day2,
  getNumCorrectPasswords
}