export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  data: {
    accessToken: string
    user: User
  }
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
  avatar_url?: string
  confirm_password?: string
}

export interface RegisterResponse {
  message: string
}

export interface ProfileResponse {
  message: string
  data: User
}
