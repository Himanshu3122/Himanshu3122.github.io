import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

/*
  Switches <html> between the default dark palette and `light`.
  The choice is remembered in localStorage; pages/_document.js applies it
  before first paint so there is no flash of the wrong theme.
*/
export default function ThemeToggle({ className = '' }) {
  const [light, setLight] = useState(false)

  useEffect(() => {
    setLight(document.documentElement.classList.contains('light'))
  }, [])

  const toggle = () => {
    const next = !light
    const root = document.documentElement
    root.classList.toggle('light', next)
    root.classList.toggle('dark', !next)
    try { localStorage.setItem('theme', next ? 'light' : 'dark') } catch { /* storage may be blocked */ }
    setLight(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
      title={light ? 'Dark theme' : 'Light theme'}
      className={`flex items-center justify-center w-9 h-9 rounded-full text-parchment-300 hover:text-gold-400 hover:bg-gold-500/10 transition-colors ${className}`}
    >
      {light ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  )
}
