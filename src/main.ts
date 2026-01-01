import './style.css'
import { renderApp } from './ui'
import { setupFormHandler } from './form-handler'
import { loadApiKey } from './storage'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = renderApp()

const keyInput = document.getElementById('key') as HTMLInputElement
const saveKeyCheckbox = document.getElementById('saveKey') as HTMLInputElement

const savedKey = loadApiKey()
if (savedKey && keyInput) {
  keyInput.value = savedKey
  if (saveKeyCheckbox) {
    saveKeyCheckbox.checked = true
  }
}

setupFormHandler()

