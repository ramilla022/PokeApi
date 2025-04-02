import react from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import PokeApp from './PokeApp'

createRoot(document.getElementById('root')).render(
  <react.StrictMode>
  <BrowserRouter>
        <PokeApp />
  </BrowserRouter>
  </react.StrictMode>
)
