const requiredArray = function (size) {
  return Array.from({ length: size }, function (_, index) {
    return index;
  });
};

console.log(requiredArray(5));
