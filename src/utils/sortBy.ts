import { IPatient } from "../redux_toolkit/Interfaces/IPatient";

export function sortAscending(arrayOfObject:IPatient[]):IPatient[]{
        const sorted=arrayOfObject;
        sorted.sort(function (a: IPatient, b: IPatient) {
          const keyA = a.name;
          const keyB = b.name;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        return sorted;
}
