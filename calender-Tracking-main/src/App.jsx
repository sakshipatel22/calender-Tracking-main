import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Admin from './Modules/Admin'
import User from './Modules/User'
import CalendarPage from './Calendar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header / Nav */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-700">
            Calendar Tracking App
          </h1>
          <nav className="space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              User Dashboard
            </Link>
            <Link
              to="/admin"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Admin Panel
            </Link>
            <Link
              to="/calendar"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Calendar
            </Link>
          </nav>
        </div>
      </header>

      {/* App Content */}
      <main className="mx-auto max-w-7xl p-4">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
