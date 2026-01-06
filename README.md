# ⚡ resistor-calc
A npm library to calculate the value of electronic resistance based on the colors of the resistor or vice versa.

![npm version](https://img.shields.io/npm/v/resistor-calc)
![npm license](https://img.shields.io/github/license/buglessir/resistor-calc)
![npm downloads](https://img.shields.io/npm/dm/resistor-calc)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/resistor-calc)
\
\
\
![resistor-calc](https://raw.githubusercontent.com/buglessir/resistor-calc/main/assets/resistor-calc.png)

## Install

```bash
npm install resistor-calc
```

## Test

```bash
npm run test
```

## Build

```bash
npm run build
```

## Functions

### parseResistor(colors: string[]): ResistorResult

Takes a 4-band resistor color array and returns the value, min, max, and tolerance.

```javascript
const result = parseResistor(['brown','black','red','gold']);
console.log(result);
/*
{
  value: 1000,
  min: 950,
  max: 1050,
  tolerance: 5,
  unit: 'Ω'
}
*/
```

### resistorToColors(value: number, tolerance: number): string[]

Takes a resistor value and tolerance and returns the corresponding color bands.

```javascript
const colors = resistorToColors(4700, 5);
console.log(colors);
// ['yellow','violet','red','gold']
```

### Types

```javascript
type ResistorResult = {
  value: number;
  min: number;
  max: number;
  tolerance: number;
  unit: 'Ω';
}
```

### Error Handling

- `parseResistor` throws an error if an invalid color or band count is provided.

- `resistorToColors` throws an error if the value or tolerance cannot be mapped to a valid color.