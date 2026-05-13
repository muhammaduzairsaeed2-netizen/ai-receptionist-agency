import { useLocation, useNavigate } from 'react-router-dom'
import FloatingParticles from '../components/FloatingParticles'
import {
  Phone,
  Clock,
  CheckCircle2,
  MessageSquare,
  Utensils,
  Scissors,
  Wrench,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { useEffect } from 'react'

interface LocationState {
  businessType?: string
}

const BUSINESS_INFO: Record<string, { label: string; greeting: string; phone: string }> = {
  takeaway: {
    label: 'Takeaway / Restaurant',
    greeting:
      'Great choice! AI Receptionist is perfect for takeaways — never miss another order during busy hours.',
    phone: '0118 214 8396',
  },
  barbershop: {
    label: 'Barbershop / Salon',
    greeting:
      'Perfect! AI Receptionist will handle your bookings and free you up to focus on your clients.',
    phone: '07438 276 572',
  },
  garage: {
    label: 'Garage / MOT Centre',
    greeting:
      'Excellent! AI Receptionist will capture every repair booking and MOT enquiry, even when you are under a car.',
    phone: '07438 276 572',
  },
}

const ICON_MAP: Record<string, React.ReactNode> = {
  takeaway: <Utensils className="w-8 h-8 text-amber-400" />,
  barbershop: <Scissors className="w-8 h-8 text-sky-400" />,
  garage: <Wrench className="w-8 h-8 text-emerald-400" />,
}

export default function DemoThanks() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState
  const businessType = state?.businessType || 'barbershop'
  const info = BUSINESS_INFO[businessType] || BUSINESS_INFO['barbershop']
  const demoPhone = info.phone
  const telLink = 'tel:' + demoPhone.replace(/\s/g, '')
  const iconEl = ICON_MAP[businessType] || <Sparkles className="w-8 h-8 text-sky-400" />

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] relative flex items-center justify-center">
      <FloatingParticles />
      <div className="relative z-10 flex items-center justify-center p-4 w-full">
        <div className="w-full max-w-lg">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              Demo Request Received!
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              We will call you within 24 hours to show you how AI Receptionist works.
            </p>

            <div className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-500/30 rounded-full px-4 py-2 mb-6">
              {iconEl}
              <span className="text-sky-300 font-medium">{info.label}</span>
            </div>

            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              {info.greeting}
            </p>

            <div className="bg-gradient-to-r from-sky-500/20 to-purple-500/20 border border-sky-500/30 rounded-xl p-6 mb-6">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                Your AI Demo Number
              </p>
              <a
                href={telLink}
                className="flex items-center justify-center gap-3 mx-auto group cursor-pointer rounded-xl px-6 py-3 transition-all hover:scale-105"
                style={{ boxShadow: '0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(168,85,247,0.25)' }}
                title="Click to call"
              >
                <Phone className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-bold text-white tracking-tight">
                  {demoPhone}
                </span>
              </a>
              <p className="text-slate-400 text-xs mt-3">
                Click number to call now
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-5 mb-6 text-left">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                What happens next?
              </h3>
              <div className="space-y-3">
                {[
                  'We call you within 24 hours',
                  '10-minute live demo of AI answering calls',
                  'Free setup if you decide to go ahead',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-sky-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 text-left">
              <MessageSquare className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-300 font-medium text-sm">Prefer to chat?</p>
                <p className="text-slate-400 text-xs mt-1">
                  Message us on WhatsApp at{' '}
                  <span className="text-white font-semibold">07438 276 572</span> and
                  we will set up your demo instantly.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>

          <p className="text-center text-slate-600 text-xs mt-6">
            AI Receptionist 4U &copy; {new Date().getFullYear()} &middot; UK AI
            Automation Agency
          </p>
        </div>
      </div>
    </main>
  )
}
