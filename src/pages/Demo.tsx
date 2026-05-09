import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import MandalaGlow from '../components/MandalaGlow'

// --- Types for VAPI SDK ---
interface VapiInstance {
  start: (assistantId: string) => Promise<void>
  stop: () => void
  on: (event: string, callback: (...args: unknown[]) => void) => void
  off: (event: string, callback: (...args: unknown[]) => void) => void
}

interface VapiMessage {
  type: string
  role?: 'user' | 'assistant' | 'system'
  transcript?: string
  transcriptType?: 'partial' | 'final'
  status?: 'in-progress' | 'completed' | 'failed'
}

const VAPI_PUBLIC_KEY = '45643144-cecf-41cd-a353-93a4daaa5ca1'
const VAPI_ASSISTANT_ID = 'c2245b47-bd44-4d0a-a9e6-799817bbd837'

export default function Demo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const vapiRef = useRef<VapiInstance | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active' | 'ended' | 'error'>('idle')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([])
  const [error, setError] = useState('')
  const [currentPartial, setCurrentPartial] = useState('')

  // Scroll to bottom of transcript
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript, currentPartial])

  // GSAP entrance animation
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

  const handleMessage = useCallback((message: unknown) => {
    const msg = message as VapiMessage

    if (msg.type === 'transcript' && msg.transcript) {
      if (msg.transcriptType === 'partial') {
        setCurrentPartial(msg.transcript)
      } else if (msg.transcriptType === 'final' && msg.role) {
        setTranscript(prev => [...prev, { role: msg.role as 'user' | 'assistant', text: msg.transcript || '' }])
        setCurrentPartial('')
      }
    }

    if (msg.type === 'speech-update') {
      if ((message as Record<string, unknown>).role === 'assistant') {
        setIsSpeaking((message as Record<string, unknown>).status === 'started')
      }
      if ((message as Record<string, unknown>).role === 'user') {
        setIsUserSpeaking((message as Record<string, unknown>).status === 'started')
      }
    }
  }, [])

  const handleStartCall = async () => {
    setError('')
    setTranscript([])
    setCurrentPartial('')
    setCallState('connecting')

    try {
      // Dynamic import VAPI to avoid SSR issues
      const { default: Vapi } = await import('@vapi-ai/web')
      const vapi = new Vapi(VAPI_PUBLIC_KEY) as VapiInstance
      vapiRef.current = vapi

      vapi.on('call-start', () => {
        setCallState('active')
      })

      vapi.on('call-end', () => {
        setCallState('ended')
        setIsSpeaking(false)
        setIsUserSpeaking(false)
      })

      vapi.on('speech-start', () => setIsSpeaking(true))
      vapi.on('speech-end', () => setIsSpeaking(false))
      vapi.on('message', handleMessage)

      vapi.on('error', (err: unknown) => {
        console.error('VAPI error:', err)
        setError('Connection failed. Please check your microphone and try again.')
        setCallState('error')
      })

      await vapi.start(VAPI_ASSISTANT_ID)
    } catch (err) {
      console.error('Failed to start call:', err)
      setError('Could not start the call. Please allow microphone access and try again.')
      setCallState('error')
    }
  }

  const handleStopCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop()
      vapiRef.current = null
    }
    setCallState('ended')
    setIsSpeaking(false)
    setIsUserSpeaking(false)
  }

  const handleRestart = () => {
    setCallState('idle')
    setTranscript([])
    setCurrentPartial('')
    setError('')
    setIsSpeaking(false)
    setIsUserSpeaking(false)
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

          {/* Main Demo Container */}
          <div className="demo-animate glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#3b82f6]/10">

            {/* Top Bar */}
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
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                        <span className="text-[#22c55e] text-[10px] uppercase tracking-wider font-medium">On Call</span>
                      </>
                    ) : callState === 'connecting' ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        <span className="text-yellow-400 text-[10px] uppercase tracking-wider font-medium">Connecting...</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#555555]" />
                        <span className="text-[#555555] text-[10px] uppercase tracking-wider font-medium">Ready</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#555555] uppercase tracking-wider">
                <span>Powered by AI Receptionist</span>
              </div>
            </div>

            {/* --- IDLE STATE --- */}
            {callState === 'idle' && (
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-[#0d0d0d]">
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
                  onClick={handleStartCall}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base hover:scale-105 active:scale-95 transition-all duration-200 neon-glow"
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

            {/* --- CONNECTING STATE --- */}
            {callState === 'connecting' && (
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-[#0d0d0d]" style={{ minHeight: '400px' }}>
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3b82f6]/30 to-[#a855f7]/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3b82f6]/50 to-[#a855f7]/50 flex items-center justify-center animate-pulse">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>
                  {/* Ripple rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/30 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
                <h3 className="text-white text-lg font-bold mb-2">Connecting to AI Agent...</h3>
                <p className="text-[#888888] text-sm">Please allow microphone access when prompted</p>
              </div>
            )}

            {/* --- ACTIVE CALL STATE --- */}
            {(callState === 'active' || callState === 'ended') && (
              <div className="bg-[#0d0d0d]" style={{ minHeight: '400px' }}>
                {/* Voice Waveform Visualizer */}
                <div className="flex flex-col items-center pt-8 pb-4 px-6 border-b border-white/5">
                  <div className="flex items-center gap-8 mb-4">
                    {/* AI Agent Avatar */}
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSpeaking
                          ? 'bg-gradient-to-br from-[#3b82f6] to-[#a855f7] shadow-lg shadow-[#3b82f6]/40 scale-110'
                          : 'bg-gradient-to-br from-[#3b82f6]/30 to-[#a855f7]/30'
                      }`}>
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-[#888888] uppercase tracking-wider">AI Agent</span>
                    </div>

                    {/* Connection Line with Waveform */}
                    <div className="flex items-center gap-1">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-gradient-to-t from-[#3b82f6] to-[#a855f7] transition-all duration-150"
                          style={{
                            height: isSpeaking || isUserSpeaking
                              ? `${12 + Math.sin(Date.now() / 200 + i) * 20 + Math.random() * 15}px`
                              : '4px',
                            animation: (isSpeaking || isUserSpeaking)
                              ? `voiceWave 0.5s ease-in-out ${i * 0.05}s infinite alternate`
                              : 'none',
                            opacity: (isSpeaking || isUserSpeaking) ? 1 : 0.3,
                          }}
                        />
                      ))}
                    </div>

                    {/* User Avatar */}
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isUserSpeaking
                          ? 'bg-gradient-to-br from-[#22c55e] to-[#16a34a] shadow-lg shadow-[#22c55e]/40 scale-110'
                          : 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                      }`}>
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-[#888888] uppercase tracking-wider">You</span>
                    </div>
                  </div>

                  {/* Speaking indicator */}
                  <div className="h-6 flex items-center justify-center">
                    {isSpeaking && (
                      <span className="text-[#3b82f6] text-xs font-medium animate-pulse">AI Agent is speaking...</span>
                    )}
                    {isUserSpeaking && (
                      <span className="text-[#22c55e] text-xs font-medium animate-pulse">Listening...</span>
                    )}
                    {!isSpeaking && !isUserSpeaking && callState === 'active' && (
                      <span className="text-[#555555] text-xs">Say something...</span>
                    )}
                    {callState === 'ended' && (
                      <span className="text-[#555555] text-xs">Call ended</span>
                    )}
                  </div>
                </div>

                {/* Transcript Area */}
                <div className="px-4 sm:px-6 py-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {transcript.length === 0 && !currentPartial && callState === 'active' && (
                    <div className="text-center py-8">
                      <p className="text-[#555555] text-sm">The conversation will appear here...</p>
                      <p className="text-[#444444] text-xs mt-1">Try saying &ldquo;Hello&rdquo; or &ldquo;What&apos;s on the menu?&rdquo;</p>
                    </div>
                  )}

                  {transcript.map((msg, i) => (
                    <div key={i} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-white rounded-br-md'
                          : 'bg-white/5 border border-white/10 text-[#cccccc] rounded-bl-md'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {currentPartial && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md text-sm bg-white/5 border border-white/10 text-[#888888] italic">
                        {currentPartial}
                        <span className="inline-block w-0.5 h-4 bg-[#3b82f6] ml-0.5 animate-pulse align-middle" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Call Controls */}
                <div className="px-4 sm:px-6 py-4 border-t border-white/5 flex items-center justify-center gap-4">
                  {callState === 'active' ? (
                    <button
                      onClick={handleStopCall}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-semibold text-sm hover:bg-red-500/30 hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75h4.5a.75.75 0 01.75.75v4.5m-19.5 0V4.5a.75.75 0 01.75-.75h4.5m0 16.5h-4.5a.75.75 0 01-.75-.75v-4.5m19.5 0v4.5a.75.75 0 01-.75.75h-4.5" />
                      </svg>
                      End Call
                    </button>
                  ) : (
                    <button
                      onClick={handleRestart}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-semibold text-sm hover:scale-105 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                      </svg>
                      Start New Call
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* --- ERROR STATE --- */}
            {callState === 'error' && (
              <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#0d0d0d]">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-2 text-center">Could Not Connect</h3>
                <p className="text-[#888888] text-sm text-center max-w-md mb-5">{error}</p>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-semibold text-sm hover:scale-105 transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            )}

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

      {/* Voice Waveform Animation Keyframes */}
      <style>{`
        @keyframes voiceWave {
          0% { height: 4px; opacity: 0.3; }
          100% { height: 32px; opacity: 1; }
        }
      `}</style>
    </main>
  )
}
