import './style.css'
import getPointForecast from './windy'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <div>
    <h1>Windy Point Forecast Demo</h1>
    <form id="forecastForm">
      <label>Latitude: <input id="lat" type="number" step="0.01" value="49.81" required></label>
      <label>Longitude: <input id="lon" type="number" step="0.01" value="16.79" required></label>
      <label>Model: <input id="model" type="text" value="gfs"></label>
      <label>Parameters (comma): <input id="params" type="text" value="wind,temp,pressure"></label>
      <label>API Key: <input id="key" type="text" placeholder="your_windy_key" required></label>
      <label><input id="saveKey" type="checkbox"> Save API key in localStorage</label>
      <button type="submit">Get Forecast</button>
    </form>
    <pre id="result" style="white-space:pre-wrap; background:#f6f8fa; padding:8px; border-radius:4px; max-height:60vh; overflow:auto;"></pre>
  </div>
`

const form = document.getElementById('forecastForm') as HTMLFormElement
const latInput = document.getElementById('lat') as HTMLInputElement
const lonInput = document.getElementById('lon') as HTMLInputElement
const modelInput = document.getElementById('model') as HTMLInputElement
const paramsInput = document.getElementById('params') as HTMLInputElement
const keyInput = document.getElementById('key') as HTMLInputElement
const saveKeyCheckbox = document.getElementById('saveKey') as HTMLInputElement
const result = document.getElementById('result') as HTMLElement

// Load saved API key from localStorage (if present)
const SAVED_KEY = 'WINDY_API_KEY'
const savedKey = localStorage.getItem(SAVED_KEY)
if (savedKey) {
  keyInput.value = savedKey
  saveKeyCheckbox.checked = true
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  result.textContent = 'Loading...'
  try {
    const lat = Number(latInput.value)
    const lon = Number(lonInput.value)
    const model = modelInput.value || undefined
    const parameters = paramsInput.value.split(',').map(s => s.trim()).filter(Boolean)
    const key = keyInput.value.trim()

    if (!key) throw new Error('API key is required')

    // Persist or remove saved key based on checkbox
    if (saveKeyCheckbox.checked) {
      localStorage.setItem(SAVED_KEY, key)
    } else {
      localStorage.removeItem(SAVED_KEY)
    }

    const data = await getPointForecast(lat, lon, { model, parameters, key })
    result.textContent = JSON.stringify(data, null, 2)
  } catch (err: any) {
    result.textContent = `Error: ${err.message || err}`
  }
})

