import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import MandalaGlow from '../components/MandalaGlow'

const BUSINESS_TYPES = [
  {
    id: 'barbershop',
    label: 'Barbershop / Salon',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    id: 'garage',
    label: 'Car Service / Garage',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206A15.705 15.705 0 013.75 21l5.877-5.877m0 0a2.548 2.548 0 013.586 0l6.837-5.63m-12.474 5.63l-4.655 5.653" />
      </svg>
    ),
  },
  {
    id: 'takeaway',
    label: 'Takeaway / Restaurant',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.617A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.617m-16.5 0V5.65a2.25 2.25 0 012.25-2.25h.75v-.75a.75.75 0 011.5 0V3.4h.75a2.25 2.25 0 012.25 2.25v.617" />
      </svg>
    ),
  },
]

const FAQS = [
  { q: 'How long is the demo?', a: 'Just 10 minutes. We will show you how the AI answers calls, takes bookings, and handles enquiries — all in real time.' },
  { q: 'Do I need to prepare anything?', a: 'Nothing at all. Just have your questions ready. We will walk you through everything and show you a live call with your own AI agent.' },
  { q: 'Is the demo really free?', a: 'Yes, 100% free. No credit card, no commitment, no hidden charges. If you like it, we will set it up for a free weekend trial.' },
  { q: 'What happens after the demo?', a: 'You decide. If you want to proceed, we set up your AI agent in under 48 hours. If not, no hard feelings — the demo was still useful!' },
  { q: 'Can I see it working for my exact business type?', a: 'Absolutely. Whether you run a garage, salon, or takeaway — we will show you the AI handling calls specific to your industry.' },
]

export default function GetDemo() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ businessName: '', contactName: '', phone: '', email: '', description: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    setStep(2)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c4c5ea5b-3fd9-43d3-8c2f-b5b6b31e74b3',
          subject: `[Demo Request] ${formData.businessName}`,
          from_name: formData.contactName,
          business_type: BUSINESS_TYPES.find(t => t.id === selectedType)?.label,
          ...formData,
        }),
      })
      navigate('/demo-call', { state: { businessType: selectedType } })
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><MandalaGlow /></div>
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${step >= 1 ? 'bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white' : 'bg-white/10 text-[#555]'}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
              Your Details
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#a855f7]" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${step >= 2 ? 'bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white' : 'bg-white/10 text-[#555]'}`}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
              Your Demo
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mb-8 text-[10px] sm:text-xs text-[#555] uppercase tracking-wider">
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>SSL Secure</span>
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>No Credit Card</span>
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-[#a855f7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>10-Min Demo</span>
          </div>
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Get Your <span className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">Free Demo</span></h1>
                <p className="text-[#888] text-base max-w-lg mx-auto">Select your business type and we will set up a personalised 10-minute demo call</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {BUSINESS_TYPES.map((type) => (
                  <button key={type.id} onClick={() => handleTypeSelect(type.id)} className="rounded-2xl p-6 border border-white/10 bg-white/[0.03] hover:border-[#3b82f6]/50 hover:bg-white/5 transition-all text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#a855f7]/20 flex items-center justify-center text-[#3b82f6]">{type.icon}</div>
                    <h3 className="text-white font-semibold text-sm">{type.label}</h3>
                    <p className="text-[#555] text-xs mt-1">Click to continue</p>
                  </button>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                  <h3 className="text-white font-semibold text-lg">Frequently Asked Questions</h3>
                </div>
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-white/5 last:border-0">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02]">
                      <span className="text-[#ccc] text-sm">{faq.q}</span>
                      <svg className={`w-4 h-4 text-[#555] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                    {openFaq === i && <div className="px-6 pb-4 text-[#888] text-sm">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 mb-4">
                  <span className="text-[#3b82f6] text-xs font-semibold">{BUSINESS_TYPES.find(t => t.id === selectedType)?.label}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Almost There!</h1>
                <p className="text-[#888] text-base">Fill in your details and we will send you straight to your demo number</p>
              </div>
              <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-[#f59e0b]/10 to-[#f59e0b]/5 border border-[#f59e0b]/30 text-center">
                <p className="text-[#f59e0b] text-xs font-semibold uppercase">Only 5 free demo slots per week — reserve yours now</p>
              </div>
              <form onSubmit={handleSubmit} className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-white/[0.03] space-y-5">
                <div>
                  <label className="block text-[#888] text-xs uppercase font-medium mb-2">Business Name *</label>
                  <input type="text" name="businessName" required value={formData.businessName} onChange={handleInputChange} placeholder="e.g., Fast Fix Garage" className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#3b82f6]/50 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[#888] text-xs uppercase font-medium mb-2">Your Name *</label>
                  <input type="text" name="contactName" required value={formData.contactName} onChange={handleInputChange} placeholder="e.g., John Smith" className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#3b82f6]/50 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[#888] text-xs uppercase font-medium mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="e.g., 07123 456 789" className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#3b82f6]/50 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[#888] text-xs uppercase font-medium mb-2">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="e.g., john@yourgarage.co.uk" className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#3b82f6]/50 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[#888] text-xs uppercase font-medium mb-2">Tell us about your business (optional)</label>
                  <textarea name="description" rows={3} value={formData.description} onChange={handleInputChange} placeholder="How many calls do you get per day?" className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white placeholder-[#555] text-sm focus:border-[#3b82f6]/50 focus:outline-none resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white font-bold text-base hover:scale-[1.02] transition-all disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Get My Demo Number →'}
                </button>
                <button type="button" onClick={() => setStep(1)} className="w-full py-2 text-[#555] text-sm hover:text-white transition-colors">← Back to business type</button>
              </form>
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/" className="text-[#555] text-sm hover:text-white transition-colors">← Back to homepage</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
