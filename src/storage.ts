const STORAGE_KEY = 'WINDY_API_KEY'

export function saveApiKey(key: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, key)
  } catch (error) {
    console.error('Failed to save API key to localStorage:', error)
  }
}

export function loadApiKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to load API key from localStorage:', error)
    return null
  }
}

export function removeApiKey(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to remove API key from localStorage:', error)
  }
}
