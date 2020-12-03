import { getNumCorrectPasswords } from "../day2";

const TEST_DATA = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

describe("findEntries", () => {
  it("should find find the number of correct passwords", () => {
    expect(getNumCorrectPasswords(TEST_DATA)).toEqual(2);
  });
});
