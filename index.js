import inquirer from 'inquirer';
import { day1, day2, day3, day4, day5, day6, day7, day8, day9, day10 } from './days/index.js';

const askQuestions = async () => {
  const { exerciseNumber } = await inquirer.prompt([
    {
      name: 'exerciseNumber',
      type: 'number',
      message: 'Please choose the exercise number to run',
    },
  ]);

  return `day${exerciseNumber}`;
};

const run = async () => {
  const exerciseNumber = process.argv.length > 2 ? process.argv[2] : await askQuestions();

  console.log(`-- Day ${exerciseNumber} --`);

  switch (exerciseNumber) {
    case 'day1':
      day1();
      break;
    case 'day2':
      day2();
      break;
    case 'day3':
      day3();
      break;
    case 'day4':
      day4();
      break;
    case 'day5':
      day5();
      break;
    case 'day6':
      day6();
      break;
    case 'day7':
      day7();
      break;
    case 'day8':
      day8();
      break;
    case 'day9':
      day9();
      break;
    case 'day10':
      day10();
      break;
    default:
      return console.log('That exercise does not exist.');
  }

  console.log('-- End --');
};

run();
