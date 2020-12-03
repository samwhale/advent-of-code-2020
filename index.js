const { prompt } = require("inquirer");
const { day1, day2 } = require("./days");

const run = async () => {
  const { exerciseNumber } = await prompt([
    {
      name: "exerciseNumber",
      type: "number",
      message: "Please choose the exercise number to run",
    },
  ]);

  console.log(`-- Day ${exerciseNumber} --`);

  switch (exerciseNumber) {
    case 1:
      day1();
      break;
    case 2:
      day2();
      break;
    default:
      throw new Error('Please select a valid exercise number');
  }

  console.log("-- End --");
};


if (require.main === module) {
  run();
}