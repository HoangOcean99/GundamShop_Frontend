import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JapanGundamPage from './pages/JapanGundamPage'
import ChinaGundamPage from './pages/ChinaGundamPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/japan-gundam" element={<JapanGundamPage />} />
        <Route path="/china-gundam" element={<ChinaGundamPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  )
}

export default App
