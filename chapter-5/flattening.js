const arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]
function flatten(arr) {
  return console.log(arr.reduce((accumluator, currentValue) => accumluator.concat(currentValue)));
}

flatten(arrays);
