import react from 'react'
import { createRoot } from 'react-dom/client'
import PokeApp from './PokeApp'
import { AuthProvider } from './Auth/authContext'

createRoot(document.getElementById('root')).render(
  <react.StrictMode>
        <AuthProvider>
        <PokeApp />
        </AuthProvider>
  </react.StrictMode>
)
