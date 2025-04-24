import react from 'react'
import { createRoot } from 'react-dom/client'
import PokeApp from './PokeApp'

createRoot(document.getElementById('root')).render(
  <react.StrictMode>
        <PokeApp />
  </react.StrictMode>
)
