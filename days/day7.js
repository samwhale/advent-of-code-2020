import { readFile } from '../utils/read-file.js';

const OUTER_BAG_EXPRESSION = /^([\w ]+) bags contain/;
const INNER_BAG_EXPRESSION = /(\d+) ([\w ]+) bag[s]?[,|.]?/g;

export const parseBagDef = (line) => {
  const [_, outerBag] = line.match(OUTER_BAG_EXPRESSION);
  const innerBagMatches = [...line.matchAll(INNER_BAG_EXPRESSION)];
  const innerBags = innerBagMatches.reduce((bags, match) => {
    bags[match[2]] = +match[1];
    return bags;
  }, {});

  return [outerBag, innerBags];
};

export const buildBagObject = (data) => {
  const bagObject = {};
  data.forEach((line) => {
    const [outerBag, innerBags] = parseBagDef(line);
    bagObject[outerBag] = innerBags;
  });

  return bagObject;
};

export const checkBag = (bagObject, target, currentType, cache = {}) => {
  let bagContainsTarget = false;

  Object.keys(bagObject[currentType]).forEach((child) => {
    if (child === target || checkBag(bagObject, target, child, cache)) {
      cache[currentType] = true;
      bagContainsTarget = true;
    }
  });

  return bagContainsTarget;
};

export const countBagsContainingTarget = (bagObject, target) => {
  let count = 0;
  Object.keys(bagObject).forEach((bagType) => {
    if (checkBag(bagObject, target, bagType)) {
      count += 1;
    }
  });

  return count;
};

export const countNumberChildBags = (bagObject, target, cache = {}) => {
  const bagChildren = Object.entries(bagObject[target]);
  let numBags = 0;

  bagChildren.forEach(([bagType, count]) => {
    let childCount;
    if (!cache[bagType]) {
      childCount = count + count * countNumberChildBags(bagObject, bagType);
      cache[bagType] = childCount;
    }

    numBags += childCount;
  });

  return numBags;
};

export const day7 = () => {
  const day7Data = readFile('../data/day7.txt').trim().split('\n');
  const bagObject = buildBagObject(day7Data);
  const resultPart1 = countBagsContainingTarget(bagObject, 'shiny gold');
  const resultPart2 = countNumberChildBags(bagObject, 'shiny gold');

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
