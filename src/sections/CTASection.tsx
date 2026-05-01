import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const businessTypes = [
  'Takeaway',
  'Restaurant',
  'Hair Salon / Barber',
  'Beauty Clinic',
  'Tradesman (Plumber/Electrician/etc)',
  'Other',
]

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        setFormError('Something went wrong. Please try again or call us directly.')
      }
    } catch {
      setFormError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="offer"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-[#0a0a0a]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 mb-6">
            <span className="text-[#3b82f6] text-sm font-semibold">Zero Risk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Try It <span className="text-gradient">Free.</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#888888] max-w-xl mx-auto leading-relaxed">
            Try our AI in your business for one weekend, completely free. If it doesn't make you money, we turn it off and you pay nothing.
          </p>
        </div>

        {submitted ? (
          <div className="glass rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#22c55e]/20 flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              You're In!
            </h3>
            <p className="text-[#888888] text-base sm:text-lg">
              We will be in touch within 24 hours to set up your free weekend trial. Get ready to stop losing calls.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 sm:p-10 space-y-5 sm:space-y-6"
          >
            {/* Web3Forms access key */}
            <input type="hidden" name="access_key" value="c4c5ea5b-3fd9-43d3-8c2f-b5b6b31e74b3" />
            <input type="hidden" name="subject" value="New AI Receptionist Trial Request" />
            <input type="hidden" name="from_name" value="AI Receptionist Website" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#888888] mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555555] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/50 transition-all duration-200"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label htmlFor="business" className="block text-sm font-medium text-[#888888] mb-2">
                Business Name
              </label>
              <input
                type="text"
                id="business"
                name="business"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555555] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/50 transition-all duration-200"
                placeholder="Smith's Plumbing"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#888888] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                pattern="[0-9\s+]*"
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555555] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/50 transition-all duration-200"
                placeholder="07700 900 000"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-[#888888] mb-2">
                Business Type
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/50 transition-all duration-200 appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                <option value="" disabled selected>
                  Select your business type
                </option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {formError && (
              <p className="text-red-400 text-sm text-center">{formError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base sm:text-lg neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                'Claim Your Free Weekend Trial'
              )}
            </button>

            <p className="text-center text-xs text-[#555555]">
              No credit card required. No strings attached. Cancel anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
