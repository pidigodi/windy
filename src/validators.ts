export type ValidationResult = {
  valid: boolean
  error?: string
}

export function validateLatitude(lat: number): ValidationResult {
  if (isNaN(lat)) {
    return { valid: false, error: 'Latitude must be a number' }
  }
  if (lat < -90 || lat > 90) {
    return { valid: false, error: 'Latitude must be between -90 and 90' }
  }
  return { valid: true }
}

export function validateLongitude(lon: number): ValidationResult {
  if (isNaN(lon)) {
    return { valid: false, error: 'Longitude must be a number' }
  }
  if (lon < -180 || lon > 180) {
    return { valid: false, error: 'Longitude must be between -180 and 180' }
  }
  return { valid: true }
}

export function validateApiKey(key: string): ValidationResult {
  if (!key || key.trim().length === 0) {
    return { valid: false, error: 'API key is required' }
  }
  return { valid: true }
}

export function validateParameters(params: string): ValidationResult {
  if (!params || params.trim().length === 0) {
    return { valid: false, error: 'At least one parameter is required' }
  }
  return { valid: true }
}
