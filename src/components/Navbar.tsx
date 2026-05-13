import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (isHome) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#3b82f6]/30 transition-shadow duration-300">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">AI Receptionist</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/get-demo"
              className="text-sm text-[#888888] hover:text-white transition-colors duration-200"
            >
              Get Free Demo
            </Link>
            <button
              onClick={() => scrollTo('offer')}
              className="text-sm text-[#888888] hover:text-white transition-colors duration-200"
            >
              Free Trial
            </button>
            <button
              onClick={() => scrollTo('offer')}
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#3b82f6]/20"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/demo"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left text-[#888888] hover:text-white transition-colors py-2"
            >
              Demo
            </Link>
            <button
              onClick={() => scrollTo('offer')}
              className="block w-full text-left text-[#888888] hover:text-white transition-colors py-2"
            >
              Free Trial
            </button>
            <button
              onClick={() => scrollTo('offer')}
              className="block w-full text-center px-5 py-3 rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
