import '../styles/globals.css'
import Head from 'next/head'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import localFont from 'next/font/local'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import BackToTop from '../components/BackToTop'
import { useEffect } from 'react'

/*
  Performance: fonts are self-hosted via next/font instead of the
  render-blocking Google Fonts stylesheet — removes two third-party
  origins from the critical path and eliminates layout shift from
  late-loading fonts (size-adjusted fallbacks are generated at build).
*/
/*
  The font files live in styles/fonts/ (latin subset, downloaded once from
  Google Fonts) so the build never has to fetch them over the network — a
  failed download from Google used to fail the whole deploy. All three are
  variable fonts: one file covers every weight in the given range.
*/
const spaceGrotesk = localFont({
  src: '../styles/fonts/SpaceGrotesk-latin.woff2',
  weight: '300 700',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const inter = localFont({
  src: '../styles/fonts/Inter-latin.woff2',
  weight: '100 900',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const jetbrains = localFont({
  src: '../styles/fonts/JetBrainsMono-latin.woff2',
  weight: '300 500',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
})

export default function App({ Component, pageProps, router }) {
  /*
    Feeds the pointer position into the card under the cursor so its
    .glass-card::after glow (globals.css) follows the mouse. One listener
    for the whole page instead of one per card.
  */
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e) => {
      const card = e.target.closest?.('.glass-card')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <style jsx global>{`
        :root {
          --font-display: ${spaceGrotesk.style.fontFamily};
          --font-body: ${inter.style.fontFamily};
          --font-jetbrains: ${jetbrains.style.fontFamily};
        }
      `}</style>
      {/*
        reducedMotion="user" makes every motion component below honour the OS
        "reduce motion" setting. The prefers-reduced-motion block in
        globals.css only reaches CSS animations — Framer Motion drives
        transforms from JS, so without this the page transitions, section
        reveals and card hovers all still ran at full amplitude for users who
        had explicitly asked for less.
      */}
      <MotionConfig reducedMotion="user">
        {/* Skip link: first focusable element, so keyboard users aren't forced
            through nine navbar stops on every page. */}
        <a href="#main" className="skip-link">Skip to main content</a>

        <Navbar />
        {/*
          Performance Fix: mode="popLayout" instead of mode="wait"
          "wait" forces old page to fully exit (300ms) before new page enters,
          creating 800ms total dead time. "popLayout" allows overlap for instant feel.
        */}
        {/* tabIndex={-1} lets the skip link move focus here, not just scroll. */}
        <main id="main" tabIndex={-1}>
          <AnimatePresence mode="popLayout" initial={false}>
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
        </main>
        <Footer />
        <BackToTop />
      </MotionConfig>
    </>
  )
}
