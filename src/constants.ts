
export const colorValues: Record<string, number> = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  gray: 8,
  white: 9,
};

export const multiplierValues: Record<string, number> = {
  black: 1,
  brown: 10,
  red: 100,
  orange: 1_000,
  yellow: 10_000,
  green: 100_000,
  blue: 1_000_000,
  violet: 10_000_000,
  gray: 100_000_000,
  white: 1_000_000_000,
  gold: 0.1,
  silver: 0.01,
};

export const toleranceValues: Record<string, number> = {
  brown: 1,
  red: 2,
  gold: 5,
  silver: 10,
};

export const digitColors: Record<number, string> = Object.fromEntries(
  Object.entries(colorValues).map(([k, v]) => [v, k])
);

export const toleranceColors: Record<number, string> = Object.fromEntries(
  Object.entries(toleranceValues).map(([k, v]) => [v, k])
);

export const multiplierColors: Record<number, string> = Object.fromEntries(
  Object.entries(multiplierValues)
    .map(([color, value]) => {
      const exponent = Math.log10(value);
      return Number.isFinite(exponent) && Number.isInteger(exponent)
        ? [exponent, color]
        : null;
    })
    .filter(Boolean) as [number, string][]
);