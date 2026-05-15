import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Cookie Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Effective Date: {new Date().toLocaleDateString('en-GB')}</p>

        <div className="space-y-8 text-slate-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit our website. They help us improve your experience and understand how our site is used.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Cookies We Use</h2>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-1">Essential Cookies</h3>
                <p className="text-slate-400 text-sm">Required for the website to function. Cannot be disabled.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-1">Analytics Cookies</h3>
                <p className="text-slate-400 text-sm">Help us understand how visitors use our site. Anonymous data only.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-1">Marketing Cookies</h3>
                <p className="text-slate-400 text-sm">Used to deliver relevant ads and measure campaign performance.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Managing Cookies</h2>
            <p>You can manage or disable cookies through your browser settings. Note that disabling essential cookies may affect website functionality.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>Questions about cookies? Contact us at <a href="mailto:muzairsaeed2@gmail.com" className="text-sky-400 hover:underline">muzairsaeed2@gmail.com</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
