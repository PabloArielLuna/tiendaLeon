import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('session')
    if (session) setUser(JSON.parse(session))
    setLoading(false)
  }, [])

  const saveSession = u => {
    setUser(u)
    localStorage.setItem('session', JSON.stringify(u))
  }
  const logout = () => {
    localStorage.removeItem('session')
    setUser(null)
    navigate('/')
  }

  const signUp = ({ username, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some(u => u.username === username)) return false
    users.push({ username, password, role: username === 'admin' ? 'admin' : 'user' })
    localStorage.setItem('users', JSON.stringify(users))
    return true
  }

  const login = ({ username, password }) => {
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    if (!users.some(u => u.username === 'admin'))
      users.push({ username: 'admin', password: '123456', role: 'admin' })
    const match = users.find(u => u.username === username && u.password === password)
    if (!match) return false
    saveSession({ username: match.username, role: match.role })
    return true
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuth: !!user,
      isAdmin: user?.role === 'admin',
      loading,
      signUp,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}