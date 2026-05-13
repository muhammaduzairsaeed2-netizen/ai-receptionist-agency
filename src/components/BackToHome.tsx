import { useLocation, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function BackToHome() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') return null;

  return (
    <button
      onClick={() => navigate('/')}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white text-sm font-medium px-4 py-2.5 rounded-full transition-all cursor-pointer group"
      title="Back to Home"
    >
      <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline">Home</span>
    </button>
  );
}
