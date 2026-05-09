import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'AI Voice Order Taker',
    subtitle: 'For Takeaways & Restaurants',
    description:
      'Your AI agent answers every call with a warm greeting, takes the complete order with perfect accuracy, confirms prices, asks about sides and drinks, and sends the ticket straight to your kitchen printer — all in under 60 seconds.',
    features: [
      'Understands menu items, customisations, and special requests',
      'Upsells sides and drinks automatically',
      'Confirms total price before hanging up',
      'Sends tickets to EPOS or kitchen printer instantly',
      'Handles multiple orders at once — no busy tone ever',
    ],
    image: '/images/ai-voice-agent.jpg',
    badge: 'Most Popular',
  },
  {
    title: 'AI Receptionist & Booking Agent',
    subtitle: 'For Salons, Barbers & Clinics',
    description:
      'An always-available receptionist that books appointments, sends confirmation texts, handles reschedules, and fills your diary while you focus on your clients. Works with any booking system.',
    features: [
      'Books directly into your calendar (Google, Fresha, Treatwell)',
      'Sends SMS confirmation and reminder texts',
      'Handles cancellations and reschedules 24/7',
      'Captures new client details and preferences',
      'Reduces no-shows by up to 40%',
    ],
    image: '/images/salon-interior.jpg',
    badge: 'For Salons',
  },
  {
    title: 'AI Lead Capture Agent',
    subtitle: 'For Tradesmen & Service Businesses',
    description:
      'Never miss another emergency call or quote request. Your AI agent captures every detail — job type, location, urgency, and contact info — then sends it straight to your phone so you can follow up fast.',
    features: [
      'Answers emergency calls at 2 AM just like 2 PM',
      'Captures job details, address, and urgency level',
      'Sends instant notifications to your mobile',
      'Qualifies leads so you prioritise the best jobs',
      'Follows up with callers if you are delayed',
    ],
    image: '/images/tradesman.jpg',
    badge: 'For Trades',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.from(item, {
          opacity: 0,
          y: 80,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
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
            AI Agents for Every <span className="text-gradient">Business.</span>
          </h2>
          <p className="mt-4 text-lg text-[#888888] max-w-2xl mx-auto">
            Each agent is trained specifically for your industry. They speak your customers language and know your menu or services inside out.
          </p>
        </div>

        <div className="space-y-20 sm:space-y-28">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el }}
              className={`flex flex-col ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-14 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                  {service.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white text-xs font-bold">
                      {service.badge}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <p className="text-[#3b82f6] text-sm font-semibold uppercase tracking-wider mb-2">{service.subtitle}</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-[#888888] text-base sm:text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#22c55e]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#cccccc] text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
