import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import MandalaGlow from '../components/MandalaGlow'

const VAPI_EMBED_URL = 'https://vapi.ai?assistantId=c2245b47-bd44-4d0a-a9e6-799817bbd837&publicKey=45643144-cecf-41cd-a353-93a4daaa5ca1'

export default function Demo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [showCall, setShowCall] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.demo-animate', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleStartDemo = () => {
    setShowCall(true)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MandalaGlow />
      </div>

      <div ref={sectionRef} className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="demo-animate inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-[#22c55e] text-xs font-semibold tracking-wide uppercase">Live AI Demo</span>
            </div>

            <h1 className="demo-animate text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Hear Our AI Agent in <span className="text-gradient">Action.</span>
            </h1>

            <p className="demo-animate text-[#888888] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-2">
              Try it yourself. Have a real conversation with our AI order-taking agent. Ask for a menu, place an order, or just say hello.
            </p>
            <p className="demo-animate text-[#555555] text-sm">
              Your conversation is secure and not stored.
            </p>
          </div>

          {/* Demo container */}
          <div className="demo-animate glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#3b82f6]/10">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-gradient-to-r from-[#3b82f6]/10 to-[#a855f7]/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">AI Order Agent</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="text-[#22c55e] text-[10px] uppercase tracking-wider font-medium">Ready to Talk</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#555555] uppercase tracking-wider">
                <span>Powered by AI Receptionist</span>
              </div>
            </div>

            {/* Content area */}
            <div className="relative bg-[#0d0d0d]" style={{ minHeight: '500px' }}>
              {/* Start screen */}
              {!showCall && (
                <div className="flex flex-col items-center justify-center py-20 px-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2 text-center">Talk to Our AI Agent</h3>
                  <p className="text-[#888888] text-sm text-center max-w-md mb-6">
                    Click the button below to start a live voice conversation. Try placing a takeaway order.
                  </p>
                  <button
                    onClick={handleStartDemo}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                    Start Live Demo
                  </button>
                  <p className="text-[#555555] text-xs mt-4 text-center">
                    Microphone access required. Powered by AI Receptionist technology.
                  </p>
                </div>
              )}

              {/* VAPI iframe embed */}
              {showCall && (
                <>
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d] z-10">
                      <div className="text-center">
                        <div className="w-10 h-10 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-[#888888] text-sm">Loading AI Agent...</p>
                        <p className="text-[#555555] text-xs mt-2">Please allow microphone access when prompted</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={VAPI_EMBED_URL}
                    title="AI Receptionist Demo"
                    className="w-full border-0"
                    style={{
                      height: '500px',
                      minHeight: '500px',
                      backgroundColor: '#0d0d0d',
                      opacity: iframeLoaded ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    allow="microphone; autoplay; camera"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    onLoad={() => setIframeLoaded(true)}
                  />
                </>
              )}
            </div>

            {/* Bottom hint bar */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4 text-[10px] text-[#555555] uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                  Secure Connection
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Natural Voice
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Multi-Language
                </span>
              </div>
              <span className="text-[10px] text-[#3b82f6] font-semibold">
                AI Receptionist Technology
              </span>
            </div>
          </div>

          {/* Try these prompts */}
          <div className="demo-animate mt-8 glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-4">Try Saying These:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Hi, what do you have on the menu?',
                'Can I get a chicken tikka masala and a pilau rice?',
                'How much is a large doner kebab?',
                'Do you do delivery to Stratford?',
                'What are your opening hours?',
                'Can I add a garlic naan to that order?',
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => { if (!showCall) handleStartDemo() }}
                  className="text-left px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-[#cccccc] text-sm hover:border-[#3b82f6]/50 hover:text-white transition-all duration-200"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="demo-animate mt-8 text-center glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Impressed? Let&apos;s Get You <span className="text-gradient">Set Up.</span>
            </h3>
            <p className="text-[#888888] text-base sm:text-lg max-w-xl mx-auto mb-6">
              This exact same AI agent can be live on your business phone line in under 48 hours. Try it free for a weekend.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base neon-glow hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Claim Your Free Weekend Trial
              </Link>
              <a
                href="tel:07438276572"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Us: 07438 276 572
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
