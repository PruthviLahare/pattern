const NEW_LINE = '\n';

const shape = [['filled-rectangle', filledRectangle],
['hollow-rectangle', hollowRectangle],
['alternating-rectangle', alternatingRectangle],
['triangle', triangle],
['diamond', diamond],
['right-aligned-triangle', rightAlignedTriangle],
['spaced-alternating-rectangle', spacedAlternatingRectangle], ['hollow-diamond', hollowDimond]];

function stars(times) {
  return '*'.repeat(times);
}

function spaces(times) {
  if (times < 0) {
    return '';
  }

  return ' '.repeat(times);
}

function rightAlignedTriangle(size) {
  let noOfSpaces = size - 1;
  const pattern = triangle(size);

  for (let index = 0; index < size; index++) {
    pattern[index] = pattern[index].padStart(size, spaces(noOfSpaces));
    noOfSpaces -= 1;
  }

  return pattern;
}

function triangle(size) {
  let pattern = [];

  for (let row = 1; row <= size; row++) {
    pattern.push(stars(row));
  }

  return pattern;
}

function alternatingRectangle(dimensions) {
  return getRectangle(dimensions, 2);
}

function getRectangle(dimensions, noOfAlternatives) {
  const symbol = ['*', '-', ' '];
  const arr = [];

  for (let row = 0; row < dimensions[1]; row++) {
    arr.push(symbol[row % noOfAlternatives].repeat(dimensions[0]));
  }

  return arr;
}

function validOddNumber(number) {
  return number % 2 === 0 ? number - 1 : number;
}

function getRow(noOfSpaces, times) {
  return spaces(noOfSpaces) + stars(times);
}

function diamond(size) {
  const diamonds = [];
  let noOfSpaces = 1;

  const dimension = validOddNumber(size);

  const middleLine = stars(dimension);
  diamonds.push(middleLine);

  for (let i = dimension - 2; i > 0; i -= 2) {
    const row = getRow(noOfSpaces, i);
    diamonds.unshift(row);
    diamonds.push(row);

    noOfSpaces += 1;
  }

  return diamonds;
}

function getMiddleLine(times) {
  if (times < 1) {
    return ['*'];
  }

  return stars(1) + spaces(times) + stars(1);
}

function getHollowLine(times) {
  if (times === 1) {
    return '*';
  }

  return stars(1) + spaces(times - 2) + stars(1);
}

function hollowDimond(size) {
  const diamonds = [];
  let noOfSpaces = 1;
  const dimension = validOddNumber(size);

  diamonds.push(getMiddleLine(dimension - 2));

  for (let iteartor = dimension - 2; iteartor > 0; iteartor -= 2) {
    const row = spaces(noOfSpaces) + getHollowLine(iteartor);
    diamonds.unshift(row);
    diamonds.push(row);

    noOfSpaces += 1;
  }

  return diamonds;
}

function spacedAlternatingRectangle(dimensions) {
  return getRectangle(dimensions, 3);
}

function hollowRectangle(dimensions) {
  if (dimensions[0] <= 2 || dimensions[1] <= 2) {
    return filledRectangle(dimensions);
  }

  const rectangle = [];

  for (let index = 2; index < dimensions[1]; index++) {
    rectangle.push(stars(1) + spaces(dimensions[0] - 2) + stars(1));
  }

  rectangle.unshift(filledRectangle([dimensions[0], 1]));
  rectangle.push(rectangle[0]);

  return rectangle;
}

function filledRectangle(dimensions) {
  const rectangle = [];

  for (let row = 0; row < dimensions[1]; row++) {
    rectangle.push(stars(dimensions[0]));
  }

  return rectangle;
}

function isRowOrColumnEmpty(dimensions) {
  return dimensions[0] === 0 || dimensions[1] === 0;
}

function getRequiredPattern(style, dimensions) {
  for (let index = 0; index < shape.length; index++) {
    if (shape[index][0] === style) {
      return shape[index][1](dimensions);
    }
  }
}

function combinedPattern(pattern1, pattern2) {
  const patterns = [];

  for (let index = 0; index < pattern1.length; index++) {
    patterns.push(pattern1[index].padEnd(pattern1.length) + ' ' + pattern2[index]);
  }

  return patterns;
}

function generatePattern(style1, dimensions, style2) {
  if (isRowOrColumnEmpty(dimensions)) {
    return '';
  }

  const pattern1 = getRequiredPattern(style1, dimensions);

  if (style2 === undefined) {
    return pattern1.join(NEW_LINE);
  }

  const pattern2 = getRequiredPattern(style2, dimensions);
  return combinedPattern(pattern1, pattern2).join(NEW_LINE);
}

function testGeneratePattern(style1, dimensions, expected, failed, style2) {
  const actual = generatePattern(style1, dimensions, style2);
  if (actual !== expected) {
    failed.push([style1, dimensions, actual, expected, style2]);
  }
}

function filledRectangleStyle(dimensions, expected, failed) {
  testGeneratePattern('filled-rectangle', dimensions, expected, failed);
}

function testFilledRectangle(failed) {
  filledRectangleStyle([0, 0], '', failed);
  filledRectangleStyle([7, 0], '', failed);
  filledRectangleStyle([0, 5], '', failed);
  filledRectangleStyle([5, 3], '*****\n*****\n*****', failed);
  filledRectangleStyle([2, 4], '**\n**\n**\n**', failed);
  filledRectangleStyle([5, 1], '*****', failed);
}

function hollowRectangleStyle(dimensions, expected, failed) {
  testGeneratePattern('hollow-rectangle', dimensions, expected, failed);
}

function testHollowRectangle(failed) {
  hollowRectangleStyle([5, 1], '*****', failed);
  hollowRectangleStyle([1, 2], '*\n*', failed);
  hollowRectangleStyle([2, 2], '**\n**', failed);
  hollowRectangleStyle([6, 2], '******\n******', failed);
  hollowRectangleStyle([4, 3], '****\n*  *\n****', failed);
  hollowRectangleStyle([5, 4], '*****\n*   *\n*   *\n*****', failed);
  hollowRectangleStyle([5, 0], '', failed);
  hollowRectangleStyle([0, 0], '', failed);
}

function testingAlternatingRectangle(dimensions, expected, failed) {
  testGeneratePattern('alternating-rectangle', dimensions, expected, failed);
}

function testAlternatingRectangle(failed) {
  testingAlternatingRectangle([3, 3], '***\n---\n***', failed);
  testingAlternatingRectangle([6, 2], '******\n------', failed);
  testingAlternatingRectangle([5, 4], '*****\n-----\n*****\n-----', failed);
}

function testingTriangle(dimensions, expected, failed) {
  testGeneratePattern('triangle', dimensions, expected, failed);
}

function testTriangle(failed) {
  testingTriangle([3], '*\n**\n***', failed);
  testingTriangle([5], '*\n**\n***\n****\n*****', failed);
  testingTriangle([0], '', failed);
  testingTriangle([1], '*', failed);
}

function testingRightAngledtriangle(dimensions, expected, failed) {
  testGeneratePattern('right-aligned-triangle', dimensions, expected, failed);
}

function testRightAngledtriangle(failed) {
  testingRightAngledtriangle([3], '  *\n **\n***', failed);
  testingRightAngledtriangle([5], '    *\n   **\n  ***\n ****\n*****', failed);
  testingRightAngledtriangle([0], '', failed);
  testingRightAngledtriangle([1], '*', failed);
}

function testingSpacedAlternatingRec(dimensions, expected, failed) {
  testGeneratePattern('spaced-alternating-rectangle', dimensions, expected, failed);
}

function testSpacedAlternatingRec(failed) {
  testingSpacedAlternatingRec([3, 4], '***\n---\n   \n***', failed);
  testingSpacedAlternatingRec([5, 6], '*****\n-----\n     \n*****\n-----\n     ', failed);
  testingSpacedAlternatingRec([4, 3], '****\n----\n    ', failed);
  testingSpacedAlternatingRec([6, 2], '******\n------', failed);
  testingSpacedAlternatingRec([0, 3], '', failed);
  testingSpacedAlternatingRec([5, 0], '', failed);
  testingSpacedAlternatingRec([2, 10], '**\n--\n  \n**\n--\n  \n**\n--\n  \n**', failed);
}

function testingDiamond(dimensions, expected, failed) {
  testGeneratePattern('diamond', dimensions, expected, failed);
}

function testDiamond(failed) {
  testingDiamond([3], ' *\n***\n *', failed);
  testingDiamond([4], ' *\n***\n *', failed);
  testingDiamond([0], '', failed);
  testingDiamond([1], '*', failed);
  testingDiamond([5], '  *\n ***\n*****\n ***\n  *', failed);
  testingDiamond([7], '   *\n  ***\n *****\n*******\n *****\n  ***\n   *', failed);
}

function testingHollowDiamond(dimensions, expected, failed) {
  testGeneratePattern('hollow-diamond', dimensions, expected, failed);
}

function testHollowDiamond(failed) {
  testingHollowDiamond([3], ' *\n* *\n *', failed);
  testingHollowDiamond([4], ' *\n* *\n *', failed);
  testingHollowDiamond([0], '', failed);
  testingHollowDiamond([1], '*', failed);
  testingHollowDiamond([5], '  *\n * *\n*   *\n * *\n  *', failed);
  testingHollowDiamond([7], '   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *', failed);
}

function testCombinedPatterns(failed) {
  testGeneratePattern('filled-rectangle', [3, 3], '*** ***\n*** * *\n*** ***', failed, 'hollow-rectangle');
  testGeneratePattern('triangle', [3], '*     *\n**   **\n*** ***', failed, 'right-aligned-triangle');
  testGeneratePattern('diamond', [5], '  *     *\n ***   * *\n***** *   *\n ***   * *\n  *     *', failed, 'hollow-diamond');
  testGeneratePattern('alternating-rectangle', [4, 3], "**** ****\n---- ----\n****     ", failed, 'spaced-alternating-rectangle');
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
  testHollowDiamond(failed);
  testCombinedPatterns(failed);

  console.table(failed);
}

testAll();