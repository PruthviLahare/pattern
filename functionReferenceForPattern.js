const shape = [['filled-rectangle', filledRectangle],
['hollow-rectangle', hollowRectangle],
['alternating-rectangle', alternatingRectangle],
['triangle', triangle],
['diamond', diamond],
['right-aligned-triangle', rightAlignedTriangle],
['spaced-alternating-rectangle', spacedAlternatingRectangle], ['hollow-diamond', hollowDimond]];

function getPattern(pattern, dimensions) {
  for (let index = 0; index < pattern.length; index++) {
    if (shape[index][0] === pattern) {
      return funcCall[index][1](dimensions);
    }
  }
}

function filledRectangle(dimensions) {
  const rectangle = [];

  for (let row = 0; row < dimensions[1]; row++) {
    rectangle.push(stars(dimensions[0]));
  }

  return rectangle;
}

function stars(times) {
  return '*'.repeat(times);
}

getPattern('filled-rectangle', [4, 4]);