import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JapanGundamPage from './pages/JapanGundamPage'
import ChinaGundamPage from './pages/ChinaGundamPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/japan-gundam" element={<JapanGundamPage />} />
        <Route path="/china-gundam" element={<ChinaGundamPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
