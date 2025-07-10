import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Store } from './store/Store'
import { Provider } from 'react-redux'
// Apply the user's system theme on initial load
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (userPrefersDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}


createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>

  <StrictMode>
    <App />
  </StrictMode>,
  </Provider>
)
