import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import MandalaGlow from '../components/MandalaGlow'

// --- Types ---
interface VapiEvent {
  type: string
  role?: 'user' | 'assistant' | 'system'
  transcript?: string
  transcriptType?: 'partial' | 'final'
  status?: 'started' | 'ended'
}

const VAPI_PUBLIC_KEY = '45643144-cecf-41cd-a353-93a4daaa5ca1'
const VAPI_ASSISTANT_ID = 'c2245b47-bd44-4d0a-a9e6-799817bbd837'
const VAPI_WEBCALL_URL = `https://vapi.ai?assistantId=${VAPI_ASSISTANT_ID}&publicKey=${VAPI_PUBLIC_KEY}`

export default function Demo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vapiRef = useRef<any>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [callState, setCallState] = useState<'idle' | 'init' | 'loading-sdk' | 'connecting' | 'active' | 'ended' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([])
  const [currentPartial, setCurrentPartial] = useState('')

  // Scroll transcript to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript, currentPartial])

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
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (vapiRef.current) { try { vapiRef.current.stop() } catch { /* ok */ } }
    }
  }, [])

  const goToError = useCallback((msg: string) => {
    setStatusMsg(msg)
    setCallState('error')
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  const handleMessage = useCallback((message: unknown) => {
    const msg = message as VapiEvent
    if (msg.type === 'transcript' && msg.transcript) {
      if (msg.transcriptType === 'partial') {
        setCurrentPartial(msg.transcript)
      } else if (msg.transcriptType === 'final' && msg.role) {
        setTranscript(prev => [...prev, { role: msg.role as 'user' | 'assistant', text: msg.transcript || '' }])
        setCurrentPartial('')
      }
    }
  }, [])

  const handleStartCall = async () => {
    setTranscript([])
    setCurrentPartial('')
    setStatusMsg('')
    setCallState('init')

    // Step 1: Init
    setCallState('loading-sdk')
    setStatusMsg('Loading voice SDK...')

    // Safety timeout: if nothing happens in 12s, show error
    timeoutRef.current = setTimeout(() => {
      goToError('Connection timed out. The voice SDK could not load. Please try the New Tab option.')
    }, 12000)

    try {
      // Dynamic import of VAPI SDK
      const mod = await import('@vapi-ai/web')
      const VapiCtor = mod.default || (mod as any).Vapi

      if (!VapiCtor) {
        goToError('Voice SDK not available. Please use the New Tab option.')
        return
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setCallState('connecting')
      setStatusMsg('Requesting microphone access...')

      const vapi = new VapiCtor(VAPI_PUBLIC_KEY)
      vapiRef.current = vapi

      vapi.on('call-start', () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setCallState('active')
        setStatusMsg('')
      })

      vapi.on('call-end', () => {
        setCallState('ended')
        setIsSpeaking(false)
      })

      vapi.on('speech-start', () => setIsSpeaking(true))
      vapi.on('speech-end', () => setIsSpeaking(false))
      vapi.on('message', handleMessage)

      vapi.on('error', (err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err)
        goToError('Call error: ' + msg)
      })

      // Start the call
      await vapi.start(VAPI_ASSISTANT_ID)

    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      goToError('Failed to start: ' + msg)
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
    setTranscript([])
    setCurrentPartial('')
    setStatusMsg('')
    setIsSpeaking(false)
  }

  const openNewTab = () => {
    window.open(VAPI_WEBCALL_URL, '_blank', 'noopener,noreferrer')
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
                    ) : callState === 'connecting' || callState === 'loading-sdk' || callState === 'init' ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /><span className="text-yellow-400 text-[10px] uppercase tracking-wider font-medium">Connecting...</span></>
                    ) : (
                      <><span className="w-1.5 h-1.5 rounded-full bg-[#555555]" /><span className="text-[#555555] text-[10px] uppercase tracking-wider font-medium">Ready</span></>
                    )}
                  </div>
                </div>
              </div>
              <span className="hidden sm:block text-[10px] text-[#555555] uppercase tracking-wider">Powered by AI Receptionist</span>
            </div>

            {/* ---- IDLE: Show both options ---- */}
            {callState === 'idle' && (
              <div className="flex flex-col items-center justify-center py-14 px-6 bg-[#0d0d0d]">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2 text-center">Talk to Our AI Agent</h3>
                <p className="text-[#888888] text-sm text-center max-w-md mb-8">
                  Start a live voice conversation right here, or open in a new tab for the best experience.
                </p>

                {/* Primary: New Tab (most reliable) */}
                <button
                  onClick={openNewTab}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base hover:scale-105 active:scale-95 transition-all duration-200 neon-glow mb-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Open Live Demo (Recommended)
                </button>

                {/* Secondary: Embedded */}
                <button
                  onClick={handleStartCall}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-[#888888] text-sm font-medium hover:bg-white/5 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                  Try Embedded Call
                </button>

                <p className="text-[#555555] text-xs mt-4 text-center">Microphone access required. Your conversation is not stored.</p>
              </div>
            )}

            {/* ---- LOADING / CONNECTING ---- */}
            {(callState === 'init' || callState === 'loading-sdk' || callState === 'connecting') && (
              <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#0d0d0d]" style={{ minHeight: '350px' }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3b82f6]/30 to-[#a855f7]/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3b82f6]/60 to-[#a855f7]/60 flex items-center justify-center animate-pulse">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/30 animate-ping" style={{ animationDuration: '1.5s' }} />
                </div>
                <h3 className="text-white text-base font-bold mb-2">
                  {callState === 'loading-sdk' ? 'Loading Voice SDK...' : 'Connecting to AI Agent...'}
                </h3>
                <p className="text-[#888888] text-sm mb-4">{statusMsg || 'Please wait...'}</p>
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] animate-pulse rounded-full" style={{ width: callState === 'loading-sdk' ? '60%' : '90%' }} />
                </div>
                <button onClick={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); handleStopCall(); setCallState('idle'); }} className="text-[#555555] text-xs mt-4 hover:text-white underline transition-colors">
                  Cancel
                </button>
              </div>
            )}

            {/* ---- ACTIVE CALL ---- */}
            {(callState === 'active' || callState === 'ended') && (
              <div className="bg-[#0d0d0d]" style={{ minHeight: '380px' }}>
                {/* Visualizer */}
                <div className="flex flex-col items-center pt-6 pb-3 px-6 border-b border-white/5">
                  <div className="flex items-center gap-6 mb-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isSpeaking ? 'bg-gradient-to-br from-[#3b82f6] to-[#a855f7] shadow-lg shadow-[#3b82f6]/30 scale-110' : 'bg-gradient-to-br from-[#3b82f6]/30 to-[#a855f7]/30'}`}>
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1 h-8">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1 rounded-full bg-gradient-to-t from-[#3b82f6] to-[#a855f7] transition-all" style={{ height: isSpeaking ? `${8 + Math.random() * 20}px` : '4px', opacity: isSpeaking ? 1 : 0.4, transitionDuration: '150ms' }} />
                      ))}
                    </div>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                      <svg className="w-7 h-7 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-[#555555] h-4">{isSpeaking ? 'AI is speaking...' : callState === 'active' ? 'Listening...' : 'Call ended'}</p>
                </div>

                {/* Transcript */}
                <div className="px-4 sm:px-6 py-3" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                  {transcript.length === 0 && !currentPartial && (
                    <p className="text-center text-[#555555] text-sm py-6">Conversation will appear here...</p>
                  )}
                  {transcript.map((m, i) => (
                    <div key={i} className={`mb-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-[#3b82f6]/20 text-white rounded-br-sm' : 'bg-white/5 text-[#cccccc] rounded-bl-sm'}`}>{m.text}</div>
                    </div>
                  ))}
                  {currentPartial && <div className="flex justify-start"><div className="max-w-[80%] px-3 py-2 rounded-xl rounded-bl-sm text-sm bg-white/5 text-[#888888] italic">{currentPartial}<span className="inline-block w-0.5 h-3.5 bg-[#3b82f6] ml-1 animate-pulse align-middle" /></div></div>}
                  <div ref={messagesEndRef} />
                </div>

                {/* Controls */}
                <div className="px-4 sm:px-6 py-3 border-t border-white/5 flex items-center justify-center gap-3">
                  {callState === 'active' ? (
                    <button onClick={handleStopCall} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-semibold text-sm hover:bg-red-500/30 transition-all">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75h4.5a.75.75 0 01.75.75v4.5m-19.5 0V4.5a.75.75 0 01.75-.75h4.5m0 16.5h-4.5a.75.75 0 01-.75-.75v-4.5m19.5 0v4.5a.75.75 0 01-.75.75h-4.5" /></svg>
                      End Call
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={handleRestart} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-semibold text-sm hover:scale-105 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>
                        Call Again
                      </button>
                      <button onClick={openNewTab} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-[#888888] text-sm hover:bg-white/5 hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        Open in Tab
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ---- ERROR ---- */}
            {callState === 'error' && (
              <div className="flex flex-col items-center justify-center py-12 px-6 bg-[#0d0d0d]">
                <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.75.75a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zm-9.75 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-white text-base font-bold mb-2 text-center">Embedded Call Not Available</h3>
                <p className="text-[#888888] text-sm text-center max-w-sm mb-6">{statusMsg || 'The embedded voice call could not start. Please use the new tab option for the best experience.'}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={openNewTab} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-sm hover:scale-105 transition-all neon-glow">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    Open in New Tab
                  </button>
                  <button onClick={handleRestart} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-[#888888] text-sm hover:bg-white/5 hover:text-white transition-all">
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Bottom bar */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-4 text-[10px] text-[#555555] uppercase tracking-wider">
                <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>Secure</span>
                <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>Natural Voice</span>
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
