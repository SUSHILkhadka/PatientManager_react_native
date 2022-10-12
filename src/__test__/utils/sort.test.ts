// import {it, expect, describe} from 'vitest';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {sortAscendingByNameKey} from '../../utils/sort';
describe('sort ascending by name key', () => {
  it('should return empty array, when empty array is passed', () => {
    const input: IPatient[] = [];

    const result = sortAscendingByNameKey(input);
    const expectedResult: IPatient[] = [];

    expect(result).toStrictEqual(expectedResult);
  });
});

describe('sort by special first then rest', () => {
  it('should return empty array, when empty array is passed', () => {
    const input: IPatient[] = [];

    const result = sortAscendingByNameKey(input);
    const expectedResult: IPatient[] = [];

    expect(result).toStrictEqual(expectedResult);
  });
});
