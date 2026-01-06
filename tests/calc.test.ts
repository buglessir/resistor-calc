import { parseResistor, resistorToColors } from '../src/calc';

describe('parseResistor()', () => {
  test('happy: brown-black-red-gold → 1kΩ ±5%', () => {
    const r = parseResistor(['brown', 'black', 'red', 'gold']);
    expect(r.value).toBe(1000);
    expect(r.tolerance).toBe(5);
    expect(r.min).toBeCloseTo(950);
    expect(r.max).toBeCloseTo(1050);
  });

  test('happy: yellow-violet-orange-gold → 47kΩ ±5%', () => {
    const r = parseResistor(['yellow', 'violet', 'orange', 'gold']);
    expect(r.value).toBe(47000);
    expect(r.tolerance).toBe(5);
  });

  test('sad: invalid digit color → error', () => {
    expect(() => parseResistor(['pink', 'black', 'red', 'gold'])).toThrow('Invalid digit color');
  });

  test('sad: invalid multiplier → error', () => {
    expect(() => parseResistor(['brown', 'black', 'pink', 'gold'])).toThrow('Invalid multiplier color');
  });

  test('sad: band count <4 → error', () => {
    expect(() => parseResistor(['brown', 'black', 'red'])).toThrow('Only 4, 5, 6 band resistors supported');
  });

  test('sad: band count >6 → error', () => {
    expect(() => parseResistor(['brown', 'black', 'red', 'gold', 'green', 'blue', 'white'])).toThrow('Only 4, 5, 6 band resistors supported');
  });
});

describe('resistorToColors()', () => {
  test('happy: 4700 Ω → yellow-violet-red-gold', () => {
    const colors = resistorToColors(4700, 5);
    expect(colors).toEqual(['yellow', 'violet', 'red', 'gold']);
  });

  test('happy: 1000 Ω → brown-black-red-gold', () => {
    const colors = resistorToColors(1000, 5);
    expect(colors).toEqual(['brown', 'black', 'red', 'gold']);
  });

  test('sad: no matching multiplier → error', () => {
    expect(() => resistorToColors(1_000_000_000_00, 5)).toThrow('No matching multiplier color');
  });

  test('sad: no matching tolerance → error', () => {
    expect(() => resistorToColors(1000, 7)).toThrow('No matching tolerance color');
  });
});
