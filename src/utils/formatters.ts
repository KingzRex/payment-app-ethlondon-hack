const MAXIMUM_FRACTION_DIGITS = 8;

export const beautifyNumericValue = (
  value: number,
  preciseDecimalPlaces?: number,
) => {
  if (preciseDecimalPlaces !== undefined) {
    if (Math.abs(value) >= 1000) {
      const formattedValue = value.toFixed(preciseDecimalPlaces);
      return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return value.toFixed(preciseDecimalPlaces);
    }
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: MAXIMUM_FRACTION_DIGITS,
  });
};