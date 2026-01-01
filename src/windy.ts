export type PointForecastOptions = {
  model?: string
  parameters?: string[]
  levels?: string[]
  key?: string
}

/**
 * Call Windy Point Forecast API and return parsed JSON.
 * Throws if `key` is missing or the response is not ok.
 */
export async function getPointForecast(
  lat: number,
  lon: number,
  opts: PointForecastOptions = {}
) {
  const { model = 'gfs', parameters = ['wind', 'temp', 'pressure'], levels = ['surface'], key } = opts

  if (!key) {
    throw new Error('Windy API key required. Provide it via opts.key')
  }

  const body = {
    lat: Math.round(lat * 100) / 100,
    lon: Math.round(lon * 100) / 100,
    model,
    parameters,
    levels,
    key,
  }

  const res = await fetch('https://api.windy.com/api/point-forecast/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Windy API error ${res.status}: ${text}`)
  }

  return res.json()
}

export default getPointForecast
