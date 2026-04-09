import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider, useAuth } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import CreatePortfolio from './pages/CreatePortfolio'
import PreviewPortfolio from './pages/PreviewPortfolio'
import EditPortfolio from './pages/EditPortfolio'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" state={{ from: location }} replace />
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-white">
      <Router>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/:username" element={<Profile />} />
                <Route path="/create" element={
                  <ProtectedRoute>
                    <CreatePortfolio />
                  </ProtectedRoute>
                } />
                <Route path="/preview" element={<PreviewPortfolio />} />
                <Route path="/edit/:username" element={
                  <ProtectedRoute>
                    <EditPortfolio />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </QueryClientProvider>
        </AuthProvider>
      </Router>
    </div>
  )
}

function App() {
  return (
    <React.StrictMode>
      <AppContent />
    </React.StrictMode>
  )
}

export default App

