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

export const countContainingBagsForType = (bagObject, target, bagType) => {
  const innerBags = Object.keys(bagObject[bagType]);

  if (!innerBags.length) {
    return 0;
  }

  const innerBagsSet = new Set(innerBags);
  if (innerBagsSet.has(target)) {
    return 1;
  }

  return innerBags.some((childBagType) =>
    countContainingBagsForType(bagObject, target, childBagType)
  )
    ? 1
    : 0;
};

export const countBagsContainingTarget = (bagObject, target) => {
  const bagTypes = Object.keys(bagObject);
  return bagTypes
    .map((bagType) => countContainingBagsForType(bagObject, target, bagType))
    .reduce((a, b) => a + b);
};

export const countNumberChildBags = (bagObject, target) => {
  const bagTypes = Object.keys(bagObject[target]);
  const numBagsContained = Object.values(bagObject[target]).reduce((a, b) => a + b, 0);
  const numBagsChildrenContain = bagTypes
    .map((bagType) => countNumberChildBags(bagObject, bagType) * bagObject[target][bagType])
    .reduce((a, b) => a + b, 0);

  return numBagsContained + numBagsChildrenContain;
};

export const day7 = () => {
  const day7Data = readFile('../data/day7.txt').trim().split('\n');
  const bagObject = buildBagObject(day7Data);
  const resultPart1 = countBagsContainingTarget(bagObject, 'shiny gold');
  const resultPart2 = countNumberChildBags(bagObject, 'shiny gold');

  console.log(`answer to part 1: ${resultPart1}`);
  console.log(`answer to part 2: ${resultPart2}`);
};
