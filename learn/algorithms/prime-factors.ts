// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/prime-factors

export function primeFactors(n: number): boolean {
  if (n <= 0) {
    throw new Error(`prime number must be greather than 0`);
  }

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}
