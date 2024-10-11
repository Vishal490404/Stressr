import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="382370878900-moij3p8epkqnct9a85k4fffii1g1rnj4.apps.googleusercontent.com">
      
      <App />
    </GoogleOAuthProvider>;
  </StrictMode>,
)
