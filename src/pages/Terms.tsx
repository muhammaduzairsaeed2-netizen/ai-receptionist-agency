import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../sections/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
        <p className="text-slate-500 text-sm mb-8">Last Updated: {new Date().toLocaleDateString('en-GB')}</p>

        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <p>These terms and conditions outline the rules and regulations for the use of AI Receptionist 4U's Website, located at ai-receptionist4u.co.uk.</p>
            <p className="mt-2">By accessing this website we assume you accept these terms and conditions. Do not continue to use the Website if you do not agree to take all of the terms and conditions stated on this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using our platform, you accept and agree to be bound by the terms and provisions of this agreement. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>AI Receptionist 4U provides an AI-powered conversational phone answering service for small businesses, including takeaways, restaurants, barbershops, salons, garages, MOT centres, cafes, bars, and tradespeople. This includes AI voice agents that answer calls, take orders, book appointments, and capture leads on behalf of your business.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
            <p>Users are responsible for maintaining the confidentiality of their account information, including their password, and for all activity that occurs under their account. Users agree to notify us immediately of any unauthorised use of their account or password or any other breach of security. Users must comply with local, national, and international laws regarding customer communications, including the GDPR. The service must not be used for illegal activities or to engage in spamming or harassing clients.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Payment and Subscription</h2>
            <p>Following any initial free trial period, continued access to the service will require a paid subscription. All fees are non-refundable except as required by law. Monthly call allowances include all calls answered by the AI, including those that result in bookings, orders, or enquiries.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Termination</h2>
            <p>We reserve the right to terminate or suspend your access to our service at any time, without prior notice or liability, for any reason, including but not limited to breach of the terms. Upon termination, your right to use the service will immediately cease.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
            <p>In no event shall AI Receptionist 4U, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use or inability to use the service; any unauthorised access to or use of our servers and/or any personal information stored therein; any interruption or cessation of transmission to or from the service; any bugs, viruses, Trojan horses, or the like that may be transmitted to or through our service by any third party; any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through the service; and/or the defamatory, offensive, or illegal conduct of any third party. In no event shall AI Receptionist 4U's liability exceed the amount paid by you, if any, for accessing the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Intellectual Property</h2>
            <p>Unless otherwise stated, AI Receptionist 4U and/or its licensors own the intellectual property rights for all material on ai-receptionist4u.co.uk. All intellectual property rights are reserved.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <p className="mt-2">Email: <a href="mailto:muzairsaeed2@gmail.com" className="text-sky-400 hover:underline">muzairsaeed2@gmail.com</a></p>
            <p>Phone: <a href="tel:07438276572" className="text-sky-400 hover:underline">07438 276 572</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
