# Windy Point Forecast Demo

This small demo shows how to call the Windy Point Forecast API from a browser app.

Features
- A simple UI to request a point forecast for given `lat`/`lon`, `model` and `parameters`.
- `src/windy.ts` — helper wrapper for the Windy Point Forecast POST endpoint.
- Optionally persist your Windy API key in the browser's `localStorage`.

Quick start

1. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

2. Open the app (Vite will show the local URL). Enter latitude, longitude, model, parameters and your Windy Point Forecast API key.

Notes on API keys
- The demo reads/writes the API key to `localStorage` when you check "Save API key in localStorage". This keeps the key only on your machine and is intended for local testing.
- If you want to keep keys out of the browser, keep them server-side and proxy requests from your backend.

.env.example

If you run server-side code you can store your key in an environment variable. Example:

```
WINDY_API_KEY=your_windy_api_key_here
```

Security
- Never commit real API keys to source control. Use `.env` files that are ignored by Git or secret management for production.

Further reading
- Windy Point Forecast docs: https://api.windy.com/point-forecast/docs
