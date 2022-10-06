export function add(a: number[]): number {
  var sum = 0;
  a.map((element: number) => {
    sum += element;
  });
  return sum;
}
