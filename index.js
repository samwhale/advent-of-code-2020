const { prompt } = require("inquirer");
const { exec } = require("shelljs");

const run = async () => {
  const { exerciseNumber } = await prompt([
    {
      name: "exerciseNumber",
      type: "number",
      message: "Please choose the exercise number to run",
    },
  ]);

  exec(`node days/day${exerciseNumber}.js`);
};

if (require.main === module) {
  run();
}
