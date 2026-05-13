import { Routes, Route } from 'react-router'
import BackToHome from './components/BackToHome'
import Home from './pages/Home'
import GetDemo from './pages/GetDemo'
import DemoThanks from './pages/DemoThanks'
import FloatingDemoButton from './components/FloatingDemoButton'

export default function App() {
  return (
    <>
      <BackToHome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-demo" element={<GetDemo />} />
        <Route path="/demo-call" element={<DemoThanks />} />
      </Routes>
      <FloatingDemoButton />
    </>
  )
}
