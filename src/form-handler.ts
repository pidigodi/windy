import getPointForecast from './windy'
import { validateLatitude, validateLongitude, validateApiKey, validateParameters } from './validators'
import { saveApiKey, removeApiKey } from './storage'
import { showLoading, hideLoading, showResult } from './ui'

export function setupFormHandler(): void {
  const form = document.getElementById('forecastForm') as HTMLFormElement
  const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement

  if (!form) return

  form.addEventListener('submit', handleFormSubmit)

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const resultContainer = document.getElementById('resultContainer') as HTMLElement
      if (resultContainer) {
        resultContainer.style.display = 'none'
      }
    })
  }
}

async function handleFormSubmit(event: Event): Promise<void> {
  event.preventDefault()

  const form = event.target as HTMLFormElement
  const latInput = document.getElementById('lat') as HTMLInputElement
  const lonInput = document.getElementById('lon') as HTMLInputElement
  const modelInput = document.getElementById('model') as HTMLSelectElement
  const paramsInput = document.getElementById('params') as HTMLInputElement
  const keyInput = document.getElementById('key') as HTMLInputElement
  const saveKeyCheckbox = document.getElementById('saveKey') as HTMLInputElement
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement

  const lat = Number(latInput.value)
  const lon = Number(lonInput.value)
  const model = modelInput.value
  const paramsValue = paramsInput.value
  const key = keyInput.value.trim()

  const latValidation = validateLatitude(lat)
  if (!latValidation.valid) {
    showResult(`Error: ${latValidation.error}`, true)
    return
  }

  const lonValidation = validateLongitude(lon)
  if (!lonValidation.valid) {
    showResult(`Error: ${lonValidation.error}`, true)
    return
  }

  const keyValidation = validateApiKey(key)
  if (!keyValidation.valid) {
    showResult(`Error: ${keyValidation.error}`, true)
    return
  }

  const paramsValidation = validateParameters(paramsValue)
  if (!paramsValidation.valid) {
    showResult(`Error: ${paramsValidation.error}`, true)
    return
  }

  if (saveKeyCheckbox.checked) {
    saveApiKey(key)
  } else {
    removeApiKey()
  }

  showLoading(submitBtn)

  try {
    const parameters = paramsValue.split(',').map(s => s.trim()).filter(Boolean)
    const data = await getPointForecast(lat, lon, { model, parameters, key })
    showResult(JSON.stringify(data, null, 2), false)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    showResult(`Error: ${errorMessage}`, true)
  } finally {
    hideLoading(submitBtn)
  }
}
