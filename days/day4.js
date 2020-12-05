import { readFile } from '../utils/index.js';

const REQUIRED_PASSPORT_KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const POSSIBLE_EYE_COLORS = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

const SEPARATION_REGEXP = /\n|\s/;
const HEIGHT_UNIT_REGEXP = /^(\d+)(cm|in)$/;
const HAIR_COLOR_REGEXP = /^#[0-9a-f]{6}$/;
const PASSPORT_ID_REGEXP = /^[0-9]{9}$/;

const validateDate = (value, minYear, maxYear) => +value >= minYear && +value <= maxYear;

const validateHeight = (value) => {
  const result = value.match(HEIGHT_UNIT_REGEXP);
  if (!result) {
    return false;
  }

  const [_, height, unit] = result;

  if (unit === 'cm') {
    return +height >= 150 && +height <= 193;
  } else if (unit === 'in') {
    return +height >= 59 && +height <= 76;
  }
};

const formatPassportData = (line) => {
  const data = line.split(SEPARATION_REGEXP);

  return data.reduce((all, info) => {
    const [key, value] = info.split(':');
    let valid = true;
    switch (key) {
      case 'byr':
        valid = validateDate(value, 1920, 2002);
        break;
      case 'iyr':
        valid = validateDate(value, 2010, 2020);
        break;
      case 'eyr':
        valid = validateDate(value, 2020, 2030);
        break;
      case 'hgt':
        valid = validateHeight(value);
        break;
      case 'hcl':
        valid = !!value.match(HAIR_COLOR_REGEXP);
        break;
      case 'ecl':
        valid = POSSIBLE_EYE_COLORS.has(value);
        break;
      case 'pid':
        valid = value.match(PASSPORT_ID_REGEXP);
        break;
    }
    all[key] = valid;
    return all;
  }, {});
};

export const isPassportValidPart1 = (line) => {
  const passportData = formatPassportData(line);
  return !REQUIRED_PASSPORT_KEYS.some((key) => !passportData.hasOwnProperty(key));
};

export const isPassportValidPart2 = (line) => {
  const passportData = formatPassportData(line);
  return !REQUIRED_PASSPORT_KEYS.some((key) => !passportData[key]);
};

export const day4 = () => {
  const day4Data = readFile('../data/day4.txt').trim().split('\n\n');

  const resultPart1 = day4Data.map(isPassportValidPart1).reduce((a, b) => a + b);
  const resultPart2 = day4Data.map(isPassportValidPart2).reduce((a, b) => a + b);

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
