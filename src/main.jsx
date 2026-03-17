import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BanditBookLandingPage from './BanditBookLandingPage.jsx'
import './index.css'

const path = window.location.pathname;

const Page = path === '/book' ? BanditBookLandingPage : App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
