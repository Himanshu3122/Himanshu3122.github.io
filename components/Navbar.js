import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { profile } from '../data/profile'

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about/' },
  { label: 'News',     href: '/news/' },
  { label: 'Research', href: '/research/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Notes',    href: '/blog/' },
  { label: 'Contact',  href: '/contact/' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [navHeight, setNavHeight]     = useState(64)   // Responsive Fix: track real nav height
  const navRef                        = useRef(null)
  const router                        = useRouter()

  /* Track scroll for backdrop blur */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false) }, [router.pathname])

  /*
    Responsive Fix: measure the actual navbar height so the mobile dropdown
    can be positioned exactly below it — avoids the hardcoded top-[60px] bug
    where the menu overlaps or leaves a gap depending on scroll state.
  */
  useEffect(() => {
    if (!navRef.current) return
    const ro = new ResizeObserver(entries => {
      if (entries[0]) setNavHeight(entries[0].contentRect.height)
    })
    ro.observe(navRef.current)
    return () => ro.disconnect()
  }, [])

  /* Close mobile menu on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && mobileOpen) setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <>
      {/*
        The slide-in is a CSS animation (.nav-enter in globals.css), not a
        Framer Motion initial state. A JS initial state is server-rendered as
        opacity:0, so the navbar stayed invisible until hydration finished —
        seconds on a slow phone. CSS starts the same animation at first paint.
      */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Primary navigation"
        className={`nav-enter fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 transition-all duration-500 ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        {/* Floating rounded bar; it gains a solid backdrop once the page scrolls */}
        <div className={`max-w-5xl mx-auto pl-3 pr-2 py-2 flex items-center justify-between rounded-2xl border transition-all duration-500 ${
          scrolled
            ? 'bg-noir-800/85 backdrop-blur-md border-gold-500/15 shadow-lg shadow-black/30'
            : 'bg-noir-800/40 backdrop-blur-sm border-parchment-300/10'
        }`}>
          {/* Logo */}
          <Link href="/" aria-label="Go to home page">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-noir-900 text-base font-bold" aria-hidden="true">{profile.firstName[0]}</span>
              </div>
              <span className="font-display text-parchment-100 text-base font-semibold">
                {profile.firstName} <span className="text-gold-400">{profile.lastName}</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const currentPath = router.pathname.endsWith('/') ? router.pathname : `${router.pathname}/`
              const linkPath = link.href.endsWith('/') ? link.href : `${link.href}/`
              const active = currentPath === linkPath || (link.href === '/' && router.pathname === '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  role="listitem"
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    active ? 'text-gold-300' : 'text-parchment-300 hover:text-parchment-100'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-gold-500/15 border border-gold-500/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              )
            })}
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV (opens in new tab)"
              className="ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-500 text-noir-900 text-sm font-semibold hover:bg-gold-400 transition-all"
            >
              <FileText size={13} aria-hidden="true" /> CV
            </a>
          </div>

          {/* Crawler and screen-reader accessible navigation ensuring all search bots index every route */}
          <nav aria-label="Accessible site navigation" className="sr-only">
            {navLinks.map((link) => (
              <Link key={`sr-${link.href}`} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger — min 44px touch target */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-parchment-200 hover:text-gold-400 transition-colors p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — positioned exactly below the navbar using measured height */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ top: `${navHeight + 8}px` }}
            className="fixed left-3 right-3 z-40 rounded-2xl bg-noir-800/95 backdrop-blur-lg border border-gold-500/20 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-3 space-y-1" role="list">
              {navLinks.map((link) => {
                const currentPath = router.pathname.endsWith('/') ? router.pathname : `${router.pathname}/`
                const linkPath = link.href.endsWith('/') ? link.href : `${link.href}/`
                const active = currentPath === linkPath || (link.href === '/' && router.pathname === '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="listitem"
                    aria-current={active ? 'page' : undefined}
                    className={`block px-4 py-3 rounded-xl text-base font-medium ${
                      active ? 'bg-gold-500/15 text-gold-300' : 'text-parchment-200 hover:bg-parchment-300/5 hover:text-gold-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-2">
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download CV (opens in new tab)"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold-500 text-noir-900 text-sm font-semibold"
                >
                  <FileText size={14} aria-hidden="true" /> Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
