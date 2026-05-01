import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MandalaGlow from '../components/MandalaGlow'
import VoiceWaveform from '../components/VoiceWaveform'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(textRef.current?.querySelectorAll('.animate-item'), {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
      }, 0.3)

      tl.from(visualRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: 'back.out(1.2)',
      }, 0.5)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <MandalaGlow />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Text content */}
          <div ref={textRef} className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="animate-item inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
              <span className="text-[#3b82f6] text-xs font-semibold tracking-wide uppercase">AI-Powered Phone Agents</span>
            </div>

            <h1 className="animate-item text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Stop Losing Money to{' '}
              <span className="text-gradient">Missed Calls.</span>
            </h1>

            <p className="animate-item mt-5 sm:mt-6 text-lg sm:text-xl lg:text-2xl font-semibold text-white/80">
              Let AI Handle Your Customers 24/7.
            </p>

            <p className="animate-item mt-4 text-sm sm:text-base text-[#888888] max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Our AI voice agents answer calls, take orders, book appointments, and capture leads — just like your best employee, but never off the clock. Built for UK takeaways, salons, and tradesmen.
            </p>

            <div className="animate-item mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#offer"
                className="inline-flex items-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-sm sm:text-base neon-glow hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Claim Your Free Weekend Trial
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm sm:text-base hover:bg-white/5 transition-all duration-200"
              >
                See How It Works
              </a>
            </div>

            {/* Trust badges */}
            <div className="animate-item mt-8 flex items-center gap-6 justify-center lg:justify-start text-xs text-[#555555]">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Set up in 48 hours</span>
              </div>
            </div>
          </div>

          {/* Right: AI Phone Visual */}
          <div ref={visualRef} className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow ring behind phone */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 blur-3xl scale-110" />

              {/* Phone mockup */}
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-[#3b82f6]/10">
                {/* Top bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="text-white text-xs font-semibold">AI Agent Online</span>
                  </div>
                  <span className="text-[#555555] text-xs">00:00:00</span>
                </div>

                {/* Waveform area */}
                <div className="px-6 py-8">
                  <div className="h-20 w-full">
                    <VoiceWaveform barCount={40} />
                  </div>
                </div>

                {/* Chat bubbles */}
                <div className="px-6 pb-6 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div className="bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%]">
                      <p className="text-white text-xs leading-relaxed">&ldquo;Hi! Thanks for calling Kebabish. What can I get for you today?&rdquo;</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[85%]">
                      <p className="text-[#cccccc] text-xs leading-relaxed">&ldquo;Can I get a large doner, chips, and a bottle of Pepsi?&rdquo;</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#888888]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div className="bg-[#3b82f6]/15 border border-[#3b82f6]/20 rounded-2xl rounded-tl-md px-4 py-2.5 max-w-[85%]">
                      <p className="text-white text-xs leading-relaxed">&ldquo;Got it! Large doner, chips, and Pepsi. Anything else? Your total is £12.50.&rdquo;</p>
                    </div>
                  </div>
                </div>

                {/* Bottom status bar */}
                <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[#555555] text-[10px] uppercase tracking-wider">Listening...</span>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-[#3b82f6]"
                        style={{
                          height: `${4 + i * 3}px`,
                          animation: `pulse 1s ease-in-out ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
