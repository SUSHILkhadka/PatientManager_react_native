// import {it, expect, describe} from 'vitest';
import {sortAscendingByNameKey,sortBySpecialFirstThenRest} from "../src/utils/sort"
describe('sort ascending by name key', () => {
  it('should return empty array, when empty array is passed', () => {
    const input=[]

    const result=sortAscendingByNameKey(input)
    const expectedResult=[]

    expect(result).toStrictEqual(expectedResult)

  });
});

describe('sort by special first then rest', () => {
    it('should return empty array, when empty array is passed', () => {
      const input=[]

      const result=sortAscendingByNameKey(input);
      const expectedResult=[]

      expect(result).toStrictEqual(expectedResult)
    });
  });
