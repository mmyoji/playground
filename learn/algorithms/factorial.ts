// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/factorial

export function factorial(n: number): number {
  let sum = 1;

  while (n !== 0) {
    sum *= n;
    n--;
  }

  return sum;
}

export function factorialRecursive(n: number): number {
  return n > 1 ? n * factorialRecursive(n - 1) : 1;
}
