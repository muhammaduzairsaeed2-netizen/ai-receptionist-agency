import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../sections/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Effective Date: {new Date().toLocaleDateString('en-GB')}</p>

        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Introduction</h2>
            <p>AI Receptionist 4U provides AI-powered phone answering services for small businesses including takeaways, restaurants, barbershops, salons, garages, MOT centres, and tradespeople.</p>
            <p className="mt-2">For customers of these businesses: the business is the Controller of the personal data and AI Receptionist 4U is a data processor (UK/EU) for your personal data.</p>
            <p className="mt-2">If you are a business owner using our Services, then AI Receptionist 4U is a Controller for your personal data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Who We Are</h2>
            <p>AI Receptionist 4U is a UK-based AI automation agency. We are regulated by the ICO (Information Commissioner's Office).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Who This Policy Applies To</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-white">Business Owners:</strong> Small business owners who use our AI receptionist service</li>
              <li><strong className="text-white">Members of the General Public:</strong> Who browse the ai-receptionist4u.co.uk website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">UK and EU Users / Data Subjects</h2>
            <p>AI Receptionist 4U complies with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Personal Data We Collect</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-white">Account data:</strong> Name, Business Name, Telephone Number, Email Address, Payment details</li>
              <li><strong className="text-white">Customer support data:</strong> Name, Telephone Number, Email Address, Support ticket details</li>
              <li><strong className="text-white">Call data:</strong> Phone numbers of callers, call recordings, call transcripts, and messages left</li>
              <li><strong className="text-white">Behavioural and analytics data:</strong> Referral source, click activity, scroll activity, page activity, time spent in the user session</li>
              <li><strong className="text-white">Log and Device data:</strong> Device type, operating system type and version, screen resolution, language settings, technical events</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Personal Data</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide our AI phone answering service to your business</li>
              <li>To process payments and manage your subscription</li>
              <li>To provide customer support and respond to enquiries</li>
              <li>To improve our AI models and service quality</li>
              <li>To send service-related communications (account updates, billing notices)</li>
              <li>To analyse usage patterns and improve our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Legal Basis for Processing</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-white">Contract:</strong> Processing necessary to deliver our service to you</li>
              <li><strong className="text-white">Legitimate Interests:</strong> Improving our AI and preventing fraud</li>
              <li><strong className="text-white">Consent:</strong> For marketing communications (you can opt out anytime)</li>
              <li><strong className="text-white">Legal Obligation:</strong> To comply with tax and accounting laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Retention</h2>
            <p>Call recordings are retained for 12 months unless you request earlier deletion. Account data is retained for 2 years after account closure for legal purposes. Analytics data is anonymised after 26 months.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
            <p>Under UK GDPR, you have the right to: access your personal data, correct inaccurate data, request deletion of your data, restrict or object to processing, data portability, and withdraw consent at any time.</p>
            <p className="mt-2">To exercise these rights, contact us at <a href="mailto:muzairsaeed2@gmail.com" className="text-sky-400 hover:underline">muzairsaeed2@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Cross-Border Data Transfers</h2>
            <p>AI Receptionist 4U is a UK-based company. Your data is primarily stored in the United Kingdom. We use sub-processors located in the EU and USA for specific services including AI processing, cloud hosting, and communications.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
            <p>For any privacy-related questions, contact our Data Protection Officer:</p>
            <p className="mt-2">Email: <a href="mailto:muzairsaeed2@gmail.com" className="text-sky-400 hover:underline">muzairsaeed2@gmail.com</a></p>
            <p>Phone: <a href="tel:07438276572" className="text-sky-400 hover:underline">07438 276 572</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
