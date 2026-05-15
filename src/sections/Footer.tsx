import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">AI Receptionist</span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed max-w-xs">
              We build custom AI phone agents that answer calls, take orders, and book appointments — 24 hours a day, 7 days a week.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Services</h4>
            <ul className="space-y-3">
              <li><span className="text-[#888888] text-sm">AI Order Takers</span></li>
              <li><span className="text-[#888888] text-sm">AI Receptionists</span></li>
              <li><span className="text-[#888888] text-sm">Lead Capture</span></li>
              <li><span className="text-[#888888] text-sm">Calendar Booking</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">For</h4>
            <ul className="space-y-3">
              <li><span className="text-[#888888] text-sm">Takeaways</span></li>
              <li><span className="text-[#888888] text-sm">Restaurants</span></li>
              <li><span className="text-[#888888] text-sm">Hair Salons</span></li>
              <li><span className="text-[#888888] text-sm">Tradesmen</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:muzairsaeed2@gmail.com" className="flex items-start gap-3 text-[#888888] hover:text-white transition-colors">
                  <svg className="w-4 h-4 mt-0.5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-sm">muzairsaeed2@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:07438276572" className="flex items-start gap-3 text-[#888888] hover:text-white transition-colors">
                  <svg className="w-4 h-4 mt-0.5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-sm">07438 276 572</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#555555] text-xs">
              &copy; {new Date().getFullYear()} AI Receptionist Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link to="/privacy" className="text-[#555555] hover:text-[#888888] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-[#555555] hover:text-[#888888] transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-[#555555] hover:text-[#888888] transition-colors">Cookie Policy</Link>
              <Link to="/gdpr" className="text-[#555555] hover:text-[#888888] transition-colors">GDPR</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
