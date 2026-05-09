import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    stat: '£1,200+',
    label: 'Lost Every Month',
    text: 'The average UK takeaway loses over £1,200 per month from missed calls during rush hour. Every ring that goes unanswered is a customer going to your competitor.',
  },
  {
    stat: '68%',
    label: 'Of Callers Hang Up',
    text: 'Nearly 7 out of 10 callers who reach a busy tone will not call back. They simply order from the next business on Google. One missed call = one lost customer forever.',
  },
  {
    stat: '£2,100',
    label: 'Monthly Staff Cost',
    text: 'A full-time receptionist costs £2,100+ per month in salary, NI, and holiday cover — and they still go home at 5 PM, take lunch breaks, and call in sick.',
  },
]

export default function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.15,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            The Problem Is <span className="text-red-400">Costing You.</span>
          </h2>
          <p className="mt-4 text-lg text-[#888888] max-w-2xl mx-auto">
            These are not made-up numbers. This is what missed calls actually cost local businesses like yours every single month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="glass rounded-2xl p-6 sm:p-8 text-center hover:border-red-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-400/5 transition-all duration-300 group"
            >
              <div className="text-4xl sm:text-5xl font-bold text-red-400 mb-1 group-hover:scale-105 transition-transform duration-300">
                {item.stat}
              </div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4">{item.label}</p>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-4" />
              <p className="text-[#888888] text-sm sm:text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
