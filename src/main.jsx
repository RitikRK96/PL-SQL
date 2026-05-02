import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ProgressProvider } from './context/ProgressContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
