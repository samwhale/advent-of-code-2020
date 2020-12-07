import {
  buildBagObject,
  countBagsContainingTarget,
  countContainingBagsForType,
  countNumberChildBags,
} from '../day7';

const TEST_DATA_1 = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`;

const TEST_DATA_2 = `
shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
`;

const PARSED_TEST_DATA_1 = {
  'bright white': { 'shiny gold': 1 },
  'dark olive': { 'dotted black': 4, 'faded blue': 3 },
  'dark orange': { 'bright white': 3, 'muted yellow': 4 },
  'dotted black': {},
  'faded blue': {},
  'light red': { 'bright white': 1, 'muted yellow': 2 },
  'muted yellow': { 'faded blue': 9, 'shiny gold': 2 },
  'shiny gold': { 'dark olive': 1, 'vibrant plum': 2 },
  'vibrant plum': { 'dotted black': 6, 'faded blue': 5 },
};

const PARSED_TEST_DATA_2 = {
  'dark blue': { 'dark violet': 2 },
  'dark green': { 'dark blue': 2 },
  'dark orange': { 'dark yellow': 2 },
  'dark red': { 'dark orange': 2 },
  'dark violet': {},
  'dark yellow': { 'dark green': 2 },
  'shiny gold': { 'dark red': 2 },
};

describe('buildBagObject', () => {
  it('should parse the data correctly', () => {
    expect(buildBagObject(TEST_DATA_1.trim().split(/\n/))).toEqual(PARSED_TEST_DATA_1);
    expect(buildBagObject(TEST_DATA_2.trim().split(/\n/))).toEqual(PARSED_TEST_DATA_2);
  });
});

describe('countContainingBagsForType', () => {
  it('should return 0 if the bagType and its children do not contain the target', () => {
    expect(countContainingBagsForType(PARSED_TEST_DATA_1, 'shiny gold', 'dotted black')).toEqual(0);
    expect(countContainingBagsForType(PARSED_TEST_DATA_1, 'shiny gold', 'dark olive')).toEqual(0);
  });

  it('should return 1 the bagType contains the target directly', () => {
    expect(countContainingBagsForType(PARSED_TEST_DATA_1, 'shiny gold', 'bright white')).toEqual(1);
  });

  it('should return 1 if a child (n levels deep) of the bagType contains the target', () => {
    expect(countContainingBagsForType(PARSED_TEST_DATA_1, 'shiny gold', 'dark orange')).toEqual(1);
  });
});

describe('countBagsContainingTarget', () => {
  it('should count the number of containing bags', () => {
    expect(countBagsContainingTarget(PARSED_TEST_DATA_1, 'shiny gold')).toEqual(4);
  });
});

describe('countNumberChildBags', () => {
  it('should count the number of bags needed to legally fill the target bag', () => {
    expect(countNumberChildBags(PARSED_TEST_DATA_2, 'shiny gold')).toEqual(126);
  });
});
