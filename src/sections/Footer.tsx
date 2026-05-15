import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#3b82f6]/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">AI Receptionist</span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed max-w-xs">
              We build custom AI phone agents that answer calls, take orders, and book appointments — 24 hours a day, 7 days a week.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Services</h4>
            <ul className="space-y-3">
              {['AI Order Takers', 'AI Receptionists', 'Lead Capture', 'Calendar Booking'].map((item) => (
                <li key={item}>
                  <span className="text-[#888888] text-sm hover:text-white transition-colors duration-200 cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business types column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">For</h4>
            <ul className="space-y-3">
              {['Takeaways', 'Restaurants', 'Hair Salons', 'Tradesmen'].map((item) => (
                <li key={item}>
                  <span className="text-[#888888] text-sm hover:text-white transition-colors duration-200 cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:muzairsaeed2@gmail.com"
                  className="group flex items-start gap-3 text-[#888888] hover:text-white transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mt-0.5 text-[#3b82f6] group-hover:text-[#a855f7] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span className="text-sm">muzairsaeed2@gmail.com</span>
                </a>
              </li>
