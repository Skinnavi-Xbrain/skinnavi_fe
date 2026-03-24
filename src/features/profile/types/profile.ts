export interface ScanUsage {
  totalLimit: number
  used: number
  remaining: number
}

export interface UserProfileResponse {
  user: {
    id: string
    email: string
    fullName: string
    avatar: string | null
    created_at: string
  }
  skinType:
    | {
        id: string
        name: string
      }
    | string
  currentPackage:
    | {
        id: string
        name: string
        price: number
        startDate: string
        endDate: string
        scanDetails: ScanUsage
      }
    | string
}

export interface UserProfileData {
  id: string
  email: string
  fullName: string
  avatar: string | null
  created_at: string
}

export interface SkinTypeData {
  id: string
  name: string
}

export interface CurrentPackageData {
  id: string
  name: string
  price: number
  startDate: string
  endDate: string
  scanDetails: ScanUsage
}

export interface UserProfileResponse {
  data: UserProfileResponse
  user: UserProfileData
  skinType: SkinTypeData | string
  currentPackage: CurrentPackageData | string
}
