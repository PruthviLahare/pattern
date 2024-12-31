const min = function (num1, num2) {
  return num1 < num2;
};

const max = function (num1, num2) {
  return num1 > num2;
};

function range(from, to, increment) {
  if (increment === 0) {
    return [];
  }

  const arr = [];
  const condition = from > to ? max : min;

  for (from; condition(from, to); from += increment) {
    arr.push(from);
  }

  return arr;
}

const requiredArray = function (size) {
  const a = range(1, size + 1, 2);
  a.push(range(size - 2, 0, -2));

  return a.flat();
};

const space = function (times) {
  return ' '.repeat(times);
};

const stars = function (times) {
  return '*'.repeat(times);
};

const shape = function (size) {
  return function (row) {
    const spaceCount = Math.floor(size - row) / 2;
    return space(spaceCount) + stars(row) + space(spaceCount);
  };
};

const diamondArr = function (size) {
  const rowCounts = requiredArray(size, 2);
  const moti = rowCounts.map(shape(size));
  return moti.join('\n');
};

console.log(diamondArr(5));
console.log(diamondArr(7));
console.log(diamondArr(3));
// console.log(diamondArr(1));
// console.log(diamondArr(4));