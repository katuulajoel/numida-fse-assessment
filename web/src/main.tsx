import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import numidaLogo from './assets/logo.numida.png'

// Set favicon dynamically
const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (link) {
  link.href = numidaLogo;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
