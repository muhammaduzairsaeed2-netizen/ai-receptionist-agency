import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetDemo from './pages/GetDemo';
import DemoThanks from './pages/DemoThanks';
import BackToHome from './components/BackToHome';
import FloatingDemoButton from './components/FloatingDemoButton';
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import GDPR from './pages/GDPR'

export default function App() {
  return (
    <>
      <BackToHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-demo" element={<GetDemo />} />
        <Route path="/demo-call" element={<DemoThanks />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/gdpr" element={<GDPR />} />
      </Routes>
    </>
  )
}
