export function roundWithPrecision(number: number, precision: number) {
    const multiplier = Math.pow(10, precision);
    return Math.round(number * multiplier) / multiplier;
}
