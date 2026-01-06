const { parseResistor, resistorToColors } = require('../dist/index.cjs.js');

console.log(parseResistor(['brown','black','red','gold']));
console.log(resistorToColors(1000, 5));
