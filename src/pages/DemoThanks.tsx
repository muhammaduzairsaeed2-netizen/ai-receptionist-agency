import { useLocation, Link } from 'react-router'
import MandalaGlow from '../components/MandalaGlow'

const BUSINESS_INFO: Record<string, { label: string; greeting: string; phone: string }> = {
  barbershop: {
    label: 'Barbershop / Salon',
    greeting: 'Perfect! AI Receptionist is already handling bookings for barbershops across the UK. Your clients can book cuts, colours, and styling — even while you\'re with another customer.',
    phone: '07438 276 572',
  },
  garage: {
    label: 'Car Service / Garage',
    greeting: 'Excellent! We\'ve set up AI Receptionist for dozens of garages just like yours. Your AI agent will handle MOT bookings, service enquiries, and repair quotes — 24/7.',
    phone: '07438 276 572',
  },
  takeaway: {
    label: 'Takeaway / Restaurant',
    greeting: 'Great choice! AI Receptionist is perfect for takeaways that get flooded with orders during rush hour. Your AI agent takes orders, captures addresses, and never puts a customer on hold.',
    phone: '0118 214 8396',
  },
}

export default function DemoThanks() {
  const location = useLocation()
  const businessType = (location.state as { businessType?: string })?.businessType || 'garage'
  const info = BUSINESS_INFO[businessType] || BUSINESS_INFO.garage
  const demoPhone = info.phone

  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <div className="fixed inset-0 z-0 pointer-events-none"><MandalaGlow /></div>
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">You are All Set! <span className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] bg-clip-text text-transparent">Here is Your Demo Number</span></h1>
            <p className="text-[#888] text-base max-w-md mx-auto">{info.greeting}</p>
          </div>
          <div className="rounded-2xl p-6 sm:p-8 border border-white/10 bg-white/[0.03] mb-6">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 text-[#3b82f6] text-xs font-semibold">{info.label}</span>
            </div>
            <div className="text-center mb-6">
              <p className="text-[#888] text-xs uppercase mb-2">Call now for your free 10-minute demo</p>
              <a href={`tel:${demoPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#22c55e]/20 to-[#22c55e]/10 border-2 border-[#22c55e]/40 text-[#22c55e] font-bold text-2xl sm:text-3xl hover:scale-105 transition-all">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                {demoPhone}
              </a>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="text-white font-semibold text-sm mb-4">What happens on the call?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] text-xs font-bold shrink-0">1</span><p className="text-[#888] text-sm">Quick intro (2 min) — We will ask about your business</p></div>
                <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] text-xs font-bold shrink-0">2</span><p className="text-[#888] text-sm">Live AI demo (5 min) — You will hear the AI answer a real call</p></div>
                <div className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] text-xs font-bold shrink-0">3</span><p className="text-[#888] text-sm">Q&A (3 min) — Ask anything about setup, pricing, features</p></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[#555] text-xs mb-3">Prefer to message?</p>
              <a href={`https://wa.me/44${demoPhone.replace(/^0/, '').replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#22c55e]/30 text-[#22c55e] text-sm font-medium hover:bg-[#22c55e]/10 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Message us on WhatsApp
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 text-[10px] text-[#555] uppercase tracking-wider">
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>No Credit Card</span>
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>10 Minutes Only</span>
            <span className="flex items-center gap-1"><svg className="w-3 h-3 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>No Commitment</span>
          </div>
          <div className="text-center mt-10">
            <Link to="/get-demo" className="text-[#555] text-sm hover:text-white transition-colors mr-6">← Request another demo</Link>
            <Link to="/" className="text-[#555] text-sm hover:text-white transition-colors">Back to homepage</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
