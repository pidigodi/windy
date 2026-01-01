export function renderApp(): string {
  return `
    <div class="container">
      <header class="header">
        <h1>Windy Point Forecast</h1>
        <p class="subtitle">Get weather forecasts for any location worldwide</p>
      </header>

      <div class="content">
        <form id="forecastForm" class="forecast-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="lat">Latitude</label>
              <input
                id="lat"
                type="number"
                step="0.01"
                value="49.81"
                min="-90"
                max="90"
                required
                placeholder="e.g., 49.81"
              >
              <span class="hint">Range: -90 to 90</span>
            </div>

            <div class="form-group">
              <label for="lon">Longitude</label>
              <input
                id="lon"
                type="number"
                step="0.01"
                value="16.79"
                min="-180"
                max="180"
                required
                placeholder="e.g., 16.79"
              >
              <span class="hint">Range: -180 to 180</span>
            </div>
          </div>

          <div class="form-group">
            <label for="model">Weather Model</label>
            <select id="model">
              <option value="gfs">GFS (Global Forecast System)</option>
              <option value="ecmwf">ECMWF (European Model)</option>
              <option value="nam">NAM (North American Mesoscale)</option>
              <option value="icon">ICON (German Model)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="params">Parameters</label>
            <input
              id="params"
              type="text"
              value="wind,temp,pressure"
              placeholder="e.g., wind,temp,pressure"
              required
            >
            <span class="hint">Comma-separated values</span>
          </div>

          <div class="form-group">
            <label for="key">API Key</label>
            <input
              id="key"
              type="password"
              placeholder="Enter your Windy API key"
              required
            >
            <span class="hint">Your API key is never sent to our servers</span>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input id="saveKey" type="checkbox">
              <span>Remember API key in browser</span>
            </label>
          </div>

          <button type="submit" class="submit-btn">
            <span class="btn-text">Get Forecast</span>
            <span class="btn-loader" style="display: none;">Loading...</span>
          </button>
        </form>

        <div id="resultContainer" class="result-container" style="display: none;">
          <div class="result-header">
            <h2>Forecast Results</h2>
            <button id="clearBtn" class="clear-btn">Clear</button>
          </div>
          <pre id="result" class="result-content"></pre>
        </div>
      </div>
    </div>
  `
}

export function showLoading(button: HTMLButtonElement): void {
  button.disabled = true
  const btnText = button.querySelector('.btn-text') as HTMLElement
  const btnLoader = button.querySelector('.btn-loader') as HTMLElement
  if (btnText) btnText.style.display = 'none'
  if (btnLoader) btnLoader.style.display = 'inline'
}

export function hideLoading(button: HTMLButtonElement): void {
  button.disabled = false
  const btnText = button.querySelector('.btn-text') as HTMLElement
  const btnLoader = button.querySelector('.btn-loader') as HTMLElement
  if (btnText) btnText.style.display = 'inline'
  if (btnLoader) btnLoader.style.display = 'none'
}

export function showResult(content: string, isError: boolean = false): void {
  const resultContainer = document.getElementById('resultContainer') as HTMLElement
  const result = document.getElementById('result') as HTMLElement

  if (resultContainer && result) {
    resultContainer.style.display = 'block'
    result.textContent = content
    result.className = isError ? 'result-content error' : 'result-content'

    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

export function hideResult(): void {
  const resultContainer = document.getElementById('resultContainer') as HTMLElement
  if (resultContainer) {
    resultContainer.style.display = 'none'
  }
}
