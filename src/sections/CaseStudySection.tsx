import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: 45, prefix: '', suffix: '+', label: 'Orders Saved Per Week' },
  { value: 1200, prefix: '£', suffix: '+', label: 'Extra Revenue Per Month' },
  { value: 99.9, prefix: '', suffix: '%', label: 'Call Answer Rate' },
]

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  const display = value % 1 !== 0 ? count.toFixed(1) : count.toLocaleString()

  return (
    <div ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-2">
      {prefix}{display}{suffix}
    </div>
  )
}

export default function CaseStudySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      metricsRef.current.forEach((metric, i) => {
        if (!metric) return
        gsap.from(metric, {
          opacity: 0,
          y: 40,
          scale: 0.9,
          duration: 0.7,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.3 + i * 0.15,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/takeaway-kitchen.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[#22c55e] text-sm font-semibold">Real Results from a Real Client</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
            How <span className="text-gradient">Kebabish Original</span> Handled the Friday Rush with Zero Missed Calls
          </h2>
          <p className="mt-4 text-lg text-[#aaaaaa] max-w-2xl mx-auto">
            A busy East London takeaway getting 80+ calls on Friday nights. They were answering less than half. We switched on their AI order-taker and the results spoke for themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {metrics.map((metric, i) => (
            <div
              key={i}
              ref={(el) => { metricsRef.current[i] = el }}
              className="glass rounded-2xl p-6 sm:p-8 text-center border border-white/10"
            >
              <AnimatedCounter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
              <div className="text-[#aaaaaa] text-base sm:text-lg font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="glass rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-center border border-white/10">
          <p className="text-white/90 text-base sm:text-lg italic leading-relaxed mb-4">
            &ldquo;I did not believe it until I saw it. The AI took 23 orders on our first Friday night. I checked the kitchen tickets — every single one was perfect. It is like having a staff member who never sleeps.&rdquo;
          </p>
          <p className="text-[#3b82f6] font-semibold text-sm">— Ahmed K., Owner of Kebabish Original</p>
        </div>
      </div>
    </section>
  )
}
