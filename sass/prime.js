'use strict';

var prime = function(n) {
  var divisor = 2;
  if (n === 1) {
    return true;
  }

  while (n > divisor) {
    if (n % divisor === 0) {
      return false;
    } else {
      divisor++;
    }

    return true;
  }
};

console.log(prime(1));
console.log(prime(137));
console.log(prime(567));
console.log(prime(1563));