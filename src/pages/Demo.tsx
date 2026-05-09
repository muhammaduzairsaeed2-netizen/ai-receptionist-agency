import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import MandalaGlow from '../components/MandalaGlow'

const VAPI_ASSISTANT_ID = 'c2245b47-bd44-4d0a-a9e6-799817bbd837'

// VAPI embed URL for the assistant demo
const VAPI_EMBED_URL = `https://vapi.ai?demo=true&assistantId=${VAPI_ASSISTANT_ID}`

export default function Demo() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const [callState, setCallState] = useState<'idle' | 'active' | 'ended'>('idle')

  // GSAP entrance
  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.demo-animate', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleStartCall = () => {
    setCallState('active')
  }

  const handleEndCall = () => {
    setCallState('ended')
  }

  const handleRestart = () => {
    setCallState('idle')
  }

  const openNewTab = () => {
    window.open(VAPI_EMBED_URL, '_blank', 'noopener,noreferrer')
  }

  // ---- RENDER ----
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><MandalaGlow /></div>

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
            <p className="demo-animate text-[#888888] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Try a real voice conversation with our AI order-taking agent. Ask for a menu, place an order, or just say hello.
            </p>
          </div>

          {/* Demo Box */}
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
                    {callState === 'active' ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /><span className="text-[#22c55e] text-[10px] uppercase tracking-wider font-medium">On Call</span></>
                    ) : callState === 'ended' ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-[#555555]" /><span className="text-[#555555] text-[10px] uppercase tracking-wider font-medium">Ended</span></>
                    ) : (
                      <><span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /><span className="text-[#22c55e] text-[10px] uppercase tracking-wider font-medium">Ready</span></>
                    )}
                  </div>
                </div>
              </div>
              <span className="hidden sm:block text-[10px] text-[#555555] uppercase tracking-wider">Powered by AI Receptionist</span>
            </div>

            {/* ---- IDLE: Start screen ---- */}
            {callState === 'idle' && (
              <div className="flex flex-col items-center justify-center py-14 px-6 bg-[#0d0d0d]">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 text-center">Talk to Our AI Agent</h3>
                <p className="text-[#888888] text-sm text-center max-w-md mb-8">
                  Start a live voice conversation with our embedded AI. Allow microphone access when asked.
                </p>
                <button
                  onClick={handleStartCall}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base hover:scale-105 active:scale-95 transition-all duration-200 neon-glow mb-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                  Start Live Demo
                </button>
                <button
                  onClick={openNewTab}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-[#888888] text-sm font-medium hover:bg-white/5 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Open in New Tab
                </button>
                <p className="text-[#555555] text-xs mt-4 text-center">Microphone access required. Your conversation is not stored.</p>
              </div>
            )}

            {/* ---- ACTIVE: Iframe with VAPI embed ---- */}
            {callState === 'active' && (
              <div className="bg-[#0d0d0d] relative">
                {/* Iframe container */}
                <div className="relative w-full" style={{ height: '500px' }}>
                  <iframe
                    src={VAPI_EMBED_URL}
                    title="AI Receptionist Live Demo"
                    className="w-full h-full border-0"
                    allow="microphone; camera; autoplay; display-capture"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                  />
                </div>
                {/* End call overlay button */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={handleEndCall}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-500/80 backdrop-blur-sm text-white font-semibold text-sm hover:bg-red-500 transition-all shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75h4.5a.75.75 0 01.75.75v4.5m-19.5 0V4.5a.75.75 0 01.75-.75h4.5m0 16.5h-4.5a.75.75 0 01-.75-.75v-4.5m19.5 0v4.5a.75.75 0 01-.75.75h-4.5" />
                    </svg>
                    End Call
                  </button>
                </div>
              </div>
            )}

            {/* ---- ENDED ---- */}
            {callState === 'ended' && (
              <div className="flex flex-col items-center justify-center py-14 px-6 bg-[#0d0d0d]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Call Ended</h3>
                <p className="text-[#888888] text-sm text-center max-w-md mb-6">
                  Thanks for trying the demo! This same AI agent can handle real calls for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={handleRestart} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-sm hover:scale-105 transition-all neon-glow">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                    Call Again
                  </button>
                  <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all">
                    Get Started
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom bar */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4 text-[10px] text-[#555555] uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                  Natural Voice
                </span>
              </div>
              <span className="text-[10px] text-[#3b82f6] font-semibold">AI Receptionist Technology</span>
            </div>
          </div>

          {/* Prompts */}
          <div className="demo-animate mt-8 glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-bold text-lg mb-4">Try Saying These:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Hi, what do you have on the menu?', 'Can I get a chicken tikka masala?', 'How much is a large doner kebab?', 'Do you do delivery?', 'What are your opening hours?', 'Can I add a garlic naan?'].map((p, i) => (
                <div key={i} className="px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-[#cccccc] text-sm">&ldquo;{p}&rdquo;</div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="demo-animate mt-8 text-center glass rounded-2xl p-8 sm:p-10 border border-white/10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Impressed? Let&apos;s Get You <span className="text-gradient">Set Up.</span></h3>
            <p className="text-[#888888] text-base max-w-xl mx-auto mb-6">This exact same AI agent can be live on your business phone line in under 48 hours.</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link to="/" className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base neon-glow hover:scale-105 transition-all">Claim Your Free Weekend Trial</Link>
              <a href="tel:07438276572" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                Call Us: 07438 276 572
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
