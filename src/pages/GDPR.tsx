import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'
import Footer from '../components/Footer'

export default function GDPR() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-sky-400" />
          <h1 className="text-3xl font-bold text-white">GDPR Compliance</h1>
        </div>
        <p className="text-slate-500 text-sm mb-8">Effective Date: {new Date().toLocaleDateString('en-GB')}</p>

        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Our Commitment to GDPR</h2>
            <p>AI Receptionist 4U is fully committed to compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. We take data protection seriously.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Lawful Basis for Processing</h2>
            <p className="mb-2">We process personal data on the basis of:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-white">Contract:</strong> Processing necessary to deliver our service to you</li>
              <li><strong className="text-white">Legitimate Interests:</strong> Improving our AI and preventing fraud</li>
              <li><strong className="text-white">Consent:</strong> For marketing communications (you can opt out anytime)</li>
              <li><strong className="text-white">Legal Obligation:</strong> To comply with tax and accounting laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data We Process</h2>
            <p>We process: business contact details, call recordings, caller phone numbers, call transcripts, and appointment bookings. All data is processed within the UK and EEA.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Subject Rights</h2>
            <p className="mb-2">Your customers (data subjects) have the right to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Request access to their call data</li>
              <li>Request deletion of their data</li>
              <li>Object to processing</li>
              <li>Request data portability</li>
            </ul>
            <p className="mt-2">We will action these requests within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
            <p>All data is encrypted at rest and in transit. We use AES-256 encryption for storage and TLS 1.3 for data transfer. Access is strictly limited to authorised personnel only.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Breach Notification</h2>
            <p>In the unlikely event of a data breach, we will notify the ICO within 72 hours and affected businesses without undue delay.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Our DPO</h2>
            <p>Our Data Protection Officer can be reached at <a href="mailto:muzairsaeed2@gmail.com" className="text-sky-400 hover:underline">muzairsaeed2@gmail.com</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
