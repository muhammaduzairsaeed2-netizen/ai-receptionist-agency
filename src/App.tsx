import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GetDemo from './pages/GetDemo';
import DemoThanks from './pages/DemoThanks';
import BackToHome from './components/BackToHome';
import FloatingDemoButton from './components/FloatingDemoButton';

export default function App() {
  return (
    <>
      <BackToHome />
      <FloatingDemoButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-demo" element={<GetDemo />} />
        <Route path="/demo-call" element={<DemoThanks />} />
      </Routes>
    </>
  );
}
