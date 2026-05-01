import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Customer Calls',
    description: 'A customer dials your business number during rush hour. Your phone rings, but your staff is too busy to answer.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'AI Picks Up Instantly',
    description: 'Our AI agent answers in under 1 second with a friendly, natural voice — customised to sound exactly like your brand.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Takes the Order or Booking',
    description: 'The AI understands the full conversation — takes orders, books appointments, captures lead details, and even upsells.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Ticket Sent Automatically',
    description: 'The order or booking is instantly sent to your kitchen printer, calendar, or CRM. You just focus on serving customers.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.from(step, {
          opacity: 0,
          x: i % 2 === 0 ? -40 : 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-20 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 mb-6">
            <span className="text-[#22c55e] text-sm font-semibold">Simple Setup</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            How It <span className="text-gradient">Works.</span>
          </h2>
          <p className="mt-4 text-lg text-[#888888] max-w-2xl mx-auto">
            Four simple steps between a missed call and a completed order. Zero hassle for you.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#3b82f6] via-[#a855f7] to-[#22c55e] opacity-30"
          />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el }}
                className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content card */}
                <div className={`w-full lg:w-5/12 ${i % 2 === 1 ? 'lg:text-right' : ''}`}>
                  <div className="glass rounded-2xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3b82f6]/10 transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-4 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center text-[#3b82f6]">
                        {step.icon}
                      </div>
                      <span className="text-3xl font-bold text-gradient opacity-50">{step.number}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-[#888888] text-sm sm:text-base leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] shadow-lg shadow-[#3b82f6]/30 relative z-10">
                    <div className="absolute inset-0 rounded-full bg-[#3b82f6] animate-ping opacity-20" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden lg:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
