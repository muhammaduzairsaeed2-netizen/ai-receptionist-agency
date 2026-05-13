import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Utensils,
  Scissors,
  Wrench,
  ChevronRight,
  ChevronLeft,
  Shield,
  CreditCard,
  Clock,
  HelpCircle,
  Send,
  CheckCircle2,
  Sparkles,
  Building2,
  User,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';

const businessTypes = [
  {
    id: 'barbershop',
    label: 'Barbershop / Salon',
    icon: Scissors,
    description: 'Booking appointments & handling enquiries',
    color: 'sky',
  },
  {
    id: 'garage',
    label: 'Garage / MOT Centre',
    icon: Wrench,
    description: 'Repair bookings & MOT enquiries',
    color: 'emerald',
  },
  {
    id: 'takeaway',
    label: 'Takeaway / Restaurant',
    icon: Utensils,
    description: 'Order taking & reservation calls',
    color: 'amber',
  },
];

const faqs = [
  {
    q: 'How does the demo work?',
    a: 'We call you and show you exactly how AI Receptionist answers calls for your business type. The demo takes about 10 minutes.',
  },
  {
    q: 'Is the demo really free?',
    a: 'Yes, 100% free. No credit card required, no hidden charges, no obligation.',
  },
  {
    q: 'What do I need for the demo?',
    a: 'Just your phone. We call you and you can hear the AI in action.',
  },
  {
    q: 'How quickly will you call me?',
    a: 'We call within 24 hours, usually the same day.',
  },
];

export default function GetDemo() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSelectType = (id: string) => {
    setSelectedType(id);
  };

  const handleContinue = () => {
    if (selectedType) setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('access_key', 'c4c5ea5b-3fd9-43d3-8c2f-b5b6b31e74b3');
    data.append('subject', `Demo Request - ${businessTypes.find(b => b.id === selectedType)?.label}`);
    data.append('business_type', businessTypes.find(b => b.id === selectedType)?.label || '');
    data.append('business_name', formData.businessName);
    data.append('contact_name', formData.contactName);
    data.append('phone', formData.phone);
    data.append('email', formData.email);
    data.append('description', formData.description);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/demo-call', { state: { businessType: selectedType } });
        }, 1500);
      }
    } catch {
      setSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-500/25 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-sky-300 text-sm font-medium">
              Free 10-Minute Demo
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get Your Free AI Demo
          </h1>
          <p className="text-slate-400 max-w-md mx-auto">
            See exactly how AI Receptionist handles calls for your business.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-10 max-w-md mx-auto">
          <div className="flex-1">
            <div className={`h-2 rounded-full transition-all ${step >= 1 ? 'bg-sky-500' : 'bg-white/10'}`} />
            <p className={`text-xs mt-2 ${step >= 1 ? 'text-sky-400' : 'text-slate-600'}`}>Business Type</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 -mt-5" />
          <div className="flex-1">
            <div className={`h-2 rounded-full transition-all ${step >= 2 ? 'bg-sky-500' : 'bg-white/10'}`} />
            <p className={`text-xs mt-2 ${step >= 2 ? 'text-sky-400' : 'text-slate-600'}`}>Your Details</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 rounded-xl p-4 mb-8 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <p className="text-amber-300 text-sm">
            <strong>Limited spots:</strong> Only 5 free demo slots per week. Book yours now.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-10 text-center">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Request Sent!</h2>
            <p className="text-slate-400">Redirecting you to your demo details...</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4 mb-8">
                <h2 className="text-lg font-semibold text-white mb-4">
                  What type of business do you run?
                </h2>
                {businessTypes.map(type => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleSelectType(type.id)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isSelected ? 'bg-sky-500/20' : 'bg-white/10'}`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{type.label}</h3>
                          <p className="text-slate-400 text-sm">{type.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-sky-500 bg-sky-500' : 'border-slate-600'}`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selectedType}
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer disabled:cursor-not-allowed"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <button type="button" onClick={handleBack} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-lg font-semibold text-white">Your Contact Details</h2>
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-1.5 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={e => updateField('businessName', e.target.value)}
                    placeholder="e.g. Joe's Barbershop"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-1.5 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={e => updateField('contactName', e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-1.5 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    placeholder="e.g. 07123 456 789"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-1.5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    Email Address (optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    placeholder="e.g. john@business.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-sm font-medium mb-1.5 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-500" />
                    Tell us about your needs (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={e => updateField('description', e.target.value)}
                    placeholder="e.g. I need help answering calls during busy lunch hours..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Request Free Demo
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Shield className="w-4 h-4" />
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <CreditCard className="w-4 h-4" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Clock className="w-4 h-4" />
                <span>10-Min Demo</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-400" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-white text-sm font-medium">{faq.q}</span>
                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-3 text-slate-400 text-sm">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
