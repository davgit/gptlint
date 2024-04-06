// Example 8: Converting measurements
type MeasurementInput = number | string

function convertToMeters(input: MeasurementInput): number {
  // Accepts measurement as a number (assumed meters) or string (with unit)
  // Always returns a number representing meters
  if (typeof input === 'number') {
    return input // Assume input is already in meters
  } else {
    // Parse string input for unit conversion
    const [value, unit] = input.split(' ')
    switch (unit) {
      case 'cm':
        return parseFloat(value) / 100
      case 'mm':
        return parseFloat(value) / 1000
      default:
        return parseFloat(value) // Default to meters if unit is unknown
    }
  }
}

// Generated by gpt-4-0125-preview