// Your code here.
const loop = (start, condition, decrement, print) => {
  for (let i = start; condition(i); i = decrement(i)) {
    print(i);
  }
};

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
