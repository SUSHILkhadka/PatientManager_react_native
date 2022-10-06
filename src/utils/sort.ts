import {IPatient} from '../redux_toolkit/Interfaces/IPatient';

export function sortAscendingByNameKey(arrayOfObject: IPatient[]): IPatient[] {
  const sorted = arrayOfObject;
  sorted.sort(function (a: IPatient, b: IPatient) {
    const keyA = a.name;
    const keyB = b.name;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return sorted;
}

export function sortBySpecialFirstThenRest(arrayOfObject: IPatient[]): IPatient[] {
  const sorted = sortAscendingByNameKey(arrayOfObject);
  const specialList: IPatient[] = [];
  const nonSpecialList: IPatient[] = [];
  sorted.map(element => {
    if (element.specialAttention) specialList.push(element);
    else nonSpecialList.push(element);
  });
  const finalList: IPatient[] = specialList.concat(nonSpecialList);
  return finalList;
}
