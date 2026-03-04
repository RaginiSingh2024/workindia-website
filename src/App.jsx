import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layout/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import OverviewPage from './pages/OverviewPage'
import ChatbotPage from './pages/ChatbotPage'
import SmartHelp from './pages/SmartHelp'
import JobsPage from './pages/JobsPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ProfilePage from './pages/ProfilePage'
import AIPostPage from './pages/AIPostPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          <Route path="smart-help" element={<SmartHelp />} />
          <Route path="ai-job-post" element={<AIPostPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
