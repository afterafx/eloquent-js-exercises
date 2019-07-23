function every(array, condition) {
  // if (array.length === 0 || array.length === undefined) return true;
  for (const elem of array) {
    if (!condition(elem)) {
      return false;
    }
  }
  return true;
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
