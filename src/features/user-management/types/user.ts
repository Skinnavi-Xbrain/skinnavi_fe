export interface Subscription {
  packageName: string
  startDate: string | null
  endDate: string | null
}

export interface UserAPI {
  id: string
  email: string
  fullName: string
  avatarUrl: string | null
  role: 'ADMIN' | 'USER'
  createdAt: string
  subscription: Subscription | null
}

export interface UserTableProps {
  currentPage: number
  itemsPerPage: number
  onDataLoaded: (total: number) => void
}

export interface PaginatedUsers {
  items: UserAPI[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface CreateUserPayload {
  fullName: string
  email: string
  password: string
  role: 'ADMIN' | 'USER'
}
