import type { ResistorResult } from './types';
import {
  colorValues,
  multiplierValues,
  toleranceValues,
  digitColors,
  toleranceColors,
  multiplierColors
} from './constants';

export const parseResistor = (colorArray: string[]): ResistorResult => {
  const len = colorArray.length;
  if (len < 4 || len > 6) {
    throw new Error('Only 4, 5, 6 band resistors supported');
  }

  const rawDigits = colorArray.slice(0, 2).map(c => colorValues[c.toLowerCase()]);
  if (rawDigits.some(v => v === undefined)) {
    throw new Error('Invalid digit color');
  }
  const [d1, d2] = rawDigits as [number, number];

  const multiplierColor = colorArray[2].toLowerCase();
  const multiplier = multiplierValues[multiplierColor];
  if (multiplier === undefined) {
    throw new Error('Invalid multiplier color');
  }

  const toleranceColor = colorArray[3].toLowerCase();
  const tolerance = toleranceValues[toleranceColor];
  if (tolerance === undefined) {
    throw new Error('Invalid tolerance color');
  }

  const value = (d1 * 10 + d2) * multiplier;
  const min = value * (1 - tolerance / 100);
  const max = value * (1 + tolerance / 100);

  return { value, min, max, tolerance, unit: 'Ω' };
}

export const resistorToColors = (value: number, tolerance: number): string[] => {
  const digits = String(Math.floor(value));
  if (digits.length < 2) throw new Error('No matching multiplier color');

  const digit1 = Number(digits[0]);
  const digit2 = Number(digits[1]);
  const multiplier = digits.length - 2;

  const d1Color = digitColors[digit1];
  const d2Color = digitColors[digit2];
  const mulColor = multiplierColors[multiplier];
  const tolColor = toleranceColors[tolerance];

  if (!mulColor) throw new Error('No matching multiplier color');
  if (!tolColor) throw new Error('No matching tolerance color');

  return [d1Color, d2Color, mulColor, tolColor];
}
