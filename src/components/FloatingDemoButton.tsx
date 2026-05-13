import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function FloatingDemoButton() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => navigate('/get-demo')}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-3.5 rounded-full shadow-lg shadow-sky-500/25 transition-all cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Sparkles className="w-4 h-4" />
      Get Free Demo
    </button>
  );
}
