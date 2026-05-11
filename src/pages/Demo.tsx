import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import MandalaGlow from '../components/MandalaGlow'

// VAPI credentials - PUBLIC KEY (safe for frontend, CORS enabled)
const VAPI_PUBLIC_KEY = 'ab2f5269-9daf-4c49-8d6f-456851df9600'
const VAPI_ASSISTANT_ID = 'c2245b47-bd44-4d0a-a9e6-799817bbd837'

export default function Demo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vapiRef = useRef<any>(null)

  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active' | 'ended' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  // GSAP entrance
  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.demo-animate', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      if (vapiRef.current) {
        try { vapiRef.current.stop() } catch { /* ok */ }
      }
    }
  }, [])

  // Connect to VAPI using webcall URL
  const connectToCall = useCallback(async (webCallUrl: string, callId: string) => {
    try {
      // Import VAPI SDK
      const { default: Vapi } = await import('@vapi-ai/web')
      const vapi = new Vapi(VAPI_PUBLIC_KEY)
      vapiRef.current = vapi

      vapi.on('call-start', () => {
        console.log('VAPI: call-start')
        setCallState('active')
        setStatusMsg('')
      })

      vapi.on('call-end', () => {
        console.log('VAPI: call-end')
        setCallState('ended')
        setIsSpeaking(false)
      })

      vapi.on('speech-start', () => setIsSpeaking(true))
      vapi.on('speech-end', () => setIsSpeaking(false))

      vapi.on('error', (err: unknown) => {
        console.error('VAPI error:', err)
        setStatusMsg('Voice connection error')
        setCallState('error')
      })

      console.log('Connecting to webcall:', callId)
      // Use reconnect to join the pre-created webcall
      await vapi.reconnect({ webCallUrl, id: callId })

    } catch (err) {
      console.error('Connect error:', err)
      const msg = err instanceof Error ? err.message : String(err)
      setStatusMsg(msg)
      setCallState('error')
    }
  }, [])

  const handleStartCall = async () => {
    setCallState('connecting')
    setStatusMsg('Creating voice session...')

    try {
      // Step 1: Create webcall via VAPI API (CORS enabled!)
      console.log('Creating webcall...')
      const response = await fetch('https://api.vapi.ai/call/web', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VAPI_PUBLIC_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assistantId: VAPI_ASSISTANT_ID }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`VAPI API error (${response.status}): ${errorText}`)
      }

      const data = await response.json()
      console.log('Webcall created:', data.id, data.webCallUrl)

      if (!data.webCallUrl || !data.id) {
        throw new Error('Invalid response from VAPI')
      }

      setStatusMsg('Joining voice room...')

      // Step 2: Connect to the webcall using VAPI SDK
      await connectToCall(data.webCallUrl, data.id)

    } catch (err) {
      console.error('Start call error:', err)
      const msg = err instanceof Error ? err.message : String(err)
      setStatusMsg('Failed to start: ' + msg)
      setCallState('error')
    }
  }

  const handleStopCall = () => {
    if (vapiRef.current) {
      try { vapiRef.current.stop() } catch { /* ok */ }
      vapiRef.current = null
    }
    setCallState('ended')
    setIsSpeaking(false)
  }

  const handleRestart = () => {
    setCallState('idle')
    setStatusMsg('')
    setIsSpeaking(false)
  }

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
              Try a real voice conversation with our AI order-taking agent. Click Start and allow microphone access.
            </p>
          </div>

          {/* Demo Container */}
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
                    ) : callState === 'connecting' ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /><span className="text-yellow-400 text-[10px] uppercase tracking-wider font-medium">Connecting...</span></>
                    ) : callState === 'error' ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-red-400" /><span className="text-red-400 text-[10px] uppercase tracking-wider font-medium">Error</span></>
                    ) : (
                      <><span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" /><span className="text-[#22c55e] text-[10px] uppercase tracking-wider font-medium">Ready</span></>
                    )}
                  </div>
                </div>
              </div>
              <span className="hidden sm:block text-[10px] text-[#555555] uppercase tracking-wider">Powered by AI Receptionist</span>
            </div>

            {/* ---- IDLE ---- */}
            {callState === 'idle' && (
              <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#0d0d0d]" style={{ minHeight: '380px' }}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2 text-center">Talk to Our AI Agent</h3>
                <p className="text-[#888888] text-sm text-center max-w-md mb-8">
                  Start a live voice conversation. Try ordering a kebab or asking about the menu.
                </p>
                <button
                  onClick={handleStartCall}
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-200 neon-glow"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                  Start Live Demo
                </button>
                <p className="text-[#555555] text-xs mt-4 text-center">Allow microphone access when prompted</p>
              </div>
            )}

            {/* ---- CONNECTING ---- */}
            {callState === 'connecting' && (
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-[#0d0d0d]" style={{ minHeight: '380px' }}>
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6]/30 to-[#a855f7]/30 flex items-center justify-center animate-pulse">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/40 animate-ping" style={{ animationDuration: '1.5s' }} />
                </div>
                <h3 className="text-white text-base font-bold mb-2">{statusMsg || 'Connecting...'}</h3>
                <div className="w-40 h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] animate-pulse rounded-full" style={{ width: '70%' }} />
                </div>
                <button onClick={() => { setCallState('idle'); setStatusMsg(''); }} className="text-[#555555] text-xs mt-6 hover:text-white underline transition-colors">Cancel</button>
              </div>
            )}

            {/* ---- ACTIVE ---- */}
            {callState === 'active' && (
              <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#0d0d0d]" style={{ minHeight: '380px' }}>
                <div className="relative mb-8">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${isSpeaking ? 'bg-gradient-to-br from-[#3b82f6] to-[#a855f7] shadow-lg shadow-[#3b82f6]/50 scale-110' : 'bg-gradient-to-br from-[#3b82f6]/60 to-[#a855f7]/60'}`}>
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>
                  {isSpeaking && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/50 animate-ping" style={{ animationDuration: '1.5s' }} />
                      <div className="absolute inset-[-8px] rounded-full border border-[#a855f7]/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
                    </>
                  )}
                </div>
                <h3 className="text-white text-xl font-bold mb-1">{isSpeaking ? 'AI Agent is Speaking' : 'Listening...'}</h3>
                <p className="text-[#888888] text-sm mb-8">{isSpeaking ? 'Your AI agent is responding' : 'Say something...'}</p>
                <div className="flex items-center gap-1 h-8 mb-8">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-1 rounded-full bg-gradient-to-t from-[#3b82f6] to-[#a855f7]" style={{ height: isSpeaking ? `${6 + Math.sin(Date.now() / 150 + i * 0.8) * 18 + 4}px` : '4px', opacity: isSpeaking ? 1 : 0.3, transition: 'all 0.15s ease' }} />
                  ))}
                </div>
                <button onClick={handleStopCall} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-semibold text-sm hover:bg-red-500/30 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75h4.5a.75.75 0 01.75.75v4.5m-19.5 0V4.5a.75.75 0 01.75-.75h4.5m0 16.5h-4.5a.75.75 0 01-.75-.75v-4.5m19.5 0v4.5a.75.75 0 01-.75.75h-4.5" />
                  </svg>
                  End Call
                </button>
              </div>
            )}

            {/* ---- ENDED ---- */}
            {callState === 'ended' && (
              <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#0d0d0d]" style={{ minHeight: '380px' }}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/10 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 text-center">Call Ended</h3>
                <p className="text-[#888888] text-sm text-center max-w-md mb-8">Thanks for trying the demo!</p>
                <div className="flex gap-3">
                  <button onClick={handleRestart} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-sm hover:scale-105 transition-all neon-glow">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                    </svg>
                    Call Again
                  </button>
                  <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-all">Get Started</Link>
                </div>
              </div>
            )}

            {/* ---- ERROR ---- */}
            {callState === 'error' && (
              <div className="flex flex-col items-center justify-center py-12 px-6 bg-[#0d0d0d]" style={{ minHeight: '380px' }}>
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.75.75a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zm-9.75 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Connection Issue</h3>
                <p className="text-[#888888] text-sm text-center max-w-sm mb-2">{statusMsg}</p>
                <p className="text-[#555555] text-xs text-center max-w-sm mb-6">Check console (F12) for details.</p>
                <button onClick={handleRestart} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-sm hover:scale-105 transition-all neon-glow">Try Again</button>
              </div>
            )}

            {/* Bottom bar */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4 text-[10px] text-[#555555] uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>Secure
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>Natural Voice
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
