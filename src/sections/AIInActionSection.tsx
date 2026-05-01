import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const conversationSteps = [
  {
    speaker: 'ai',
    text: 'Good evening! Welcome to Royal Spice. I am your AI assistant. What can I get started for you?',
  },
  {
    speaker: 'customer',
    text: 'Hi, can I get a chicken tikka masala, a pilau rice, and two garlic naans please?',
  },
  {
    speaker: 'ai',
    text: 'Perfect! Chicken tikka masala, pilau rice, and two garlic naans. Would you like any drinks with that?',
  },
  {
    speaker: 'customer',
    text: 'Yes, one large Coke please.',
  },
  {
    speaker: 'ai',
    text: 'Great choice. Your total is £18.90. Would you like to pay by card or cash on collection?',
  },
]

export default function AIInActionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= conversationSteps.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 2500)
    return () => clearInterval(timer)
  }, [isPlaying])

  const startDemo = () => {
    setActiveStep(0)
    setIsPlaying(true)
  }

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Neural background */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/ai-neural-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/30 mb-6">
            <span className="text-[#a855f7] text-sm font-semibold">Live Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Watch Our AI Take an <span className="text-gradient">Order.</span>
          </h2>
          <p className="mt-4 text-lg text-[#888888] max-w-2xl mx-auto">
            See how naturally our AI agent handles a real takeaway order — understanding accents, upselling, and processing payments just like a human.
          </p>
        </div>

        {/* AI Phone Interface */}
        <div className="glass rounded-3xl overflow-hidden max-w-2xl mx-auto">
          {/* Call header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#3b82f6]/10 to-[#a855f7]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">AI Order Agent</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span className="text-[#22c55e] text-[10px] uppercase tracking-wider font-medium">On Call</span>
                </div>
              </div>
            </div>
            <button
              onClick={startDemo}
              disabled={isPlaying}
              className="px-4 py-1.5 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#3b82f6] text-xs font-semibold hover:bg-[#3b82f6]/30 transition-colors disabled:opacity-50"
            >
              {isPlaying ? 'Playing...' : 'Replay Demo'}
            </button>
          </div>

          {/* Animated waveform */}
          <div className="px-6 py-6 border-b border-white/5">
            <div className="flex items-center justify-center gap-[2px] h-12">
              {Array.from({ length: 48 }).map((_, i) => {
                const isActive = isPlaying && i % 3 === 0
                const height = isActive
                  ? `${20 + Math.sin(i * 0.5 + activeStep) * 16 + Math.cos(i * 0.3) * 10}px`
                  : '4px'
                return (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-[#3b82f6] to-[#a855f7] transition-all duration-300"
                    style={{
                      height,
                      opacity: isPlaying ? 0.6 + Math.random() * 0.4 : 0.2,
                    }}
                  />
                )
              })}
            </div>
            <p className="text-center text-[10px] text-[#555555] mt-2 uppercase tracking-widest">
              {isPlaying ? 'Processing voice input...' : 'Click Replay to watch the demo'}
            </p>
          </div>

          {/* Conversation */}
          <div className="px-6 py-6 space-y-4 min-h-[280px]">
            {conversationSteps.slice(0, activeStep + 1).map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${step.speaker === 'customer' ? 'justify-end' : ''} animate-fade-in`}
              >
                {step.speaker === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                    step.speaker === 'ai'
                      ? 'bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-tl-md'
                      : 'bg-white/5 border border-white/10 rounded-tr-md'
                  }`}
                >
                  <p className={`text-sm leading-relaxed ${step.speaker === 'ai' ? 'text-white' : 'text-[#cccccc]'}`}>
                    {step.text}
                  </p>
                </div>
                {step.speaker === 'customer' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#888888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isPlaying && (
              <div className="flex items-center gap-2 text-[#555555] text-xs">
                <div className="flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <div
                      key={d}
                      className="w-1 h-1 rounded-full bg-[#3b82f6]"
                      style={{ animation: `bounce 1s infinite ${d * 0.15}s` }}
                    />
                  ))}
                </div>
                <span>AI is typing...</span>
              </div>
            )}
          </div>

          {/* Status footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-[#555555] uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                24/7 Available
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                Multi-lingual
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Instant
              </span>
            </div>
            <span className="text-[10px] text-[#3b82f6] font-semibold">
              Order #2841
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
