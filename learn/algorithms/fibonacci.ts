// see: https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/math/fibonacci

export function fibonacci(): () => number {
  let init = true;
  let prev = 0;
  let curr = 1;

  return () => {
    if (init) {
      init = false;
      return 1;
    }

    const next = prev + curr;
    prev = curr;
    curr = next;
    return next;
  };
}
