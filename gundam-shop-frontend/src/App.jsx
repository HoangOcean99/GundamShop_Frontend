import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JapanGundamPage from './pages/JapanGundamPage'
import ChinaGundamPage from './pages/ChinaGundamPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/japan-gundam" element={<ProtectedRoute><JapanGundamPage /></ProtectedRoute>} />
        <Route path="/china-gundam" element={<ProtectedRoute><ChinaGundamPage /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      </Routes>
    </Router>
  )
}

export default App
