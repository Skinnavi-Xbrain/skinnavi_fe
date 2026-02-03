import { useCallback, useEffect, useState } from 'react'
import { login as loginApi, getProfile, logout as logoutApi } from '../services/auth.api'
import type { User, LoginRequest } from '../types/auth'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  const refreshUser = useCallback(async () => {
    if (!localStorage.getItem('accessToken')) return
    try {
      const res = await getProfile()
      setUser(res.data)
    } catch {
      localStorage.removeItem('accessToken')
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const run = async () => {
      await refreshUser()
    }
    run()
  }, [refreshUser])

  const login = async (payload: LoginRequest) => {
    const res = await loginApi(payload)
    localStorage.setItem('accessToken', res.data.accessToken)
    setUser(res.data.user)
    return res
  }

  const logout = async () => {
    await logoutApi()
    setUser(null)
  }

  return {
    user,
    setUser,
    login,
    logout,
    refreshUser
  }
}
