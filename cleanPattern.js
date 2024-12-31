// const getRow = function (char) {
//   return function (times) {
//     return char.repeat(times);
//   };
// };

const getRow = (char) => (times) => char.repeat(times);

const [stars, space, dash] = ["*", " ", "-"].map(getRow);

const isSmall = (num1, num2) => num1 < num2;

const isGreater = (num1, num2) => num1 > num2;

const range = function (from, to, increment) {
  const numbers = [];
  const condition = from > to ? isSmall : isGreater;

  for (let number = from; condition(to, number); number += increment) {
    numbers.push(number);
  }

  return numbers;
};

const createFilledArray = function (size, fillWith) {
  return Array(size).fill(fillWith);
};

const hollowRow = function (size) {
  return stars(1) + space(size - 2) + stars(1);
};

const filledRectangle = function ([columns, rows]) {
  return createFilledArray(rows, columns).map(stars);
};

const hollowRectangle = function ([columns, rows]) {
  if (rows <= 2) {
    return filledRectangle([columns, rows]);
  }

  const rowCounts = createFilledArray(rows - 2, columns);
  const rectangle = rowCounts.map(hollowRow);

  return [stars(columns), ...rectangle, stars(columns)];
};

const alternate = function (rowCounts, times, upto) {
  const alternateRows = [stars(times), dash(times), space(times)];

  return rowCounts.map((element) => alternateRows[element % upto]);
};

const alternatingRectangle = function ([columns, rows]) {
  const rowCounts = range(0, rows, 1);

  return alternate(rowCounts, columns, 2);
};

const triangle = function ([size]) {
  return range(1, size + 1, 1).map(stars);
};

const alignRight = function (triangleShape, size) {
  return triangleShape.map((row) => row.padStart(size, " "));
};

const rightAngledtriangle = function (size) {
  const triangleShape = triangle(size);

  return alignRight(triangleShape, size);
};

const spacedAlternatingRectangle = function ([columns, rows]) {
  const rowCounts = range(0, rows, 1);

  return alternate(rowCounts, columns, 3);
};

const getLayout = function (size) {
  const upper = range(1, size + 1, 2);
  const lower = range(size - 2, 0, -2);

  return [...upper, ...lower];
};

const diamondShape = function (size) {
  return function (row) {
    const spaceCount = (size - row) / 2;

    return space(spaceCount) + stars(row);
  };
};

const isEven = (num) => (num & 1) === 0;

const adjustToOdd = (number) => (isEven(number) ? number - 1 : number);

const diamond = function ([size]) {
  if (size <= 2) {
    return [stars(1)];
  }

  const odd = adjustToOdd(size);

  return getLayout(odd, 2).map(diamondShape(odd));
};

function areRowOrColumnEmpty([columns, rows]) {
  return columns === 0 || rows === 0;
}

const isZero = (x) => x === 0;

const generatePattern = function (style, dimensions) {
  if (dimensions.some(isZero)) {
    return "";
  }

  const patterns = {
    "filled-rectangle": filledRectangle,
    "hollow-rectangle": hollowRectangle,
    "alternating-rectangle": alternatingRectangle,
    triangle: triangle,
    "right-aligned-triangle": rightAngledtriangle,
    "spaced-alternating-rectangle": spacedAlternatingRectangle,
    diamond: diamond,
  };

  return patterns[style](dimensions).join("\n");
};

function testGeneratePattern(style1, dimensions, expected, failed) {
  const actual = generatePattern(style1, dimensions);

  if (actual !== expected) {
    failed.push([style1, dimensions, actual, expected]);
  }
}

function filledRectangleStyle(dimensions, expected, failed) {
  testGeneratePattern("filled-rectangle", dimensions, expected, failed);
}

function testFilledRectangle(failed) {
  filledRectangleStyle([0, 0], "", failed);
  filledRectangleStyle([7, 0], "", failed);
  filledRectangleStyle([0, 5], "", failed);
  filledRectangleStyle([5, 3], "*****\n*****\n*****", failed);
  filledRectangleStyle([2, 4], "**\n**\n**\n**", failed);
  filledRectangleStyle([5, 1], "*****", failed);
}

function hollowRectangleStyle(dimensions, expected, failed) {
  testGeneratePattern("hollow-rectangle", dimensions, expected, failed);
}

function testHollowRectangle(failed) {
  hollowRectangleStyle([5, 1], "*****", failed);
  hollowRectangleStyle([1, 2], "*\n*", failed);
  hollowRectangleStyle([2, 2], "**\n**", failed);
  hollowRectangleStyle([6, 2], "******\n******", failed);
  hollowRectangleStyle([4, 3], "****\n*  *\n****", failed);
  hollowRectangleStyle([5, 4], "*****\n*   *\n*   *\n*****", failed);
  hollowRectangleStyle([5, 0], "", failed);
  hollowRectangleStyle([0, 0], "", failed);
}

function AlternatingRectangleStyle(dimensions, expected, failed) {
  testGeneratePattern("alternating-rectangle", dimensions, expected, failed);
}

function testAlternatingRectangle(failed) {
  AlternatingRectangleStyle([0, 3], "", failed);
  AlternatingRectangleStyle([3, 3], "***\n---\n***", failed);
  AlternatingRectangleStyle([4, 1], "****", failed);
  AlternatingRectangleStyle([6, 2], "******\n------", failed);
  AlternatingRectangleStyle([5, 4], "*****\n-----\n*****\n-----", failed);
}

function triangleStyle(dimensions, expected, failed) {
  testGeneratePattern("triangle", dimensions, expected, failed);
}

function testTriangle(failed) {
  triangleStyle([3], "*\n**\n***", failed);
  triangleStyle([5], "*\n**\n***\n****\n*****", failed);
  triangleStyle([0], "", failed);
  triangleStyle([1], "*", failed);
}

function rightAngledtriangleStyle(dimensions, expected, failed) {
  testGeneratePattern("right-aligned-triangle", dimensions, expected, failed);
}

function testRightAngledtriangle(failed) {
  rightAngledtriangleStyle([3], "  *\n **\n***", failed);
  rightAngledtriangleStyle([5], "    *\n   **\n  ***\n ****\n*****", failed);
  rightAngledtriangleStyle([0], "", failed);
  rightAngledtriangleStyle([1], "*", failed);
}

function spacedAlternatingRecStyle(dimensions, expected, failed) {
  testGeneratePattern(
    "spaced-alternating-rectangle",
    dimensions,
    expected,
    failed
  );
}

function testSpacedAlternatingRec(failed) {
  spacedAlternatingRecStyle([3, 4], "***\n---\n   \n***", failed);
  spacedAlternatingRecStyle(
    [5, 6],
    "*****\n-----\n     \n*****\n-----\n     ",
    failed
  );
  spacedAlternatingRecStyle([4, 3], "****\n----\n    ", failed);
  spacedAlternatingRecStyle([6, 2], "******\n------", failed);
  spacedAlternatingRecStyle([0, 3], "", failed);
  spacedAlternatingRecStyle([5, 0], "", failed);
  spacedAlternatingRecStyle(
    [2, 10],
    "**\n--\n  \n**\n--\n  \n**\n--\n  \n**",
    failed
  );
}

function diamondStyle(dimensions, expected, failed) {
  testGeneratePattern("diamond", dimensions, expected, failed);
}

function testDiamond(failed) {
  diamondStyle([3], " *\n***\n *", failed);
  diamondStyle([4], " *\n***\n *", failed);
  diamondStyle([0], "", failed);
  diamondStyle([1], "*", failed);
  diamondStyle([5], "  *\n ***\n*****\n ***\n  *", failed);
  diamondStyle(
    [7],
    "   *\n  ***\n *****\n*******\n *****\n  ***\n   *",
    failed
  );
}

function testAll() {
  const failed = [];

  testFilledRectangle(failed);
  testHollowRectangle(failed);
  testAlternatingRectangle(failed);
  testTriangle(failed);
  testRightAngledtriangle(failed);
  testSpacedAlternatingRec(failed);
  testDiamond(failed);

  console.table(failed);
}

testAll();
