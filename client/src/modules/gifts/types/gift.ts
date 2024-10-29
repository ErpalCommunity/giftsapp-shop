import type { IUser } from '@/shared/types/user'

export interface IGift {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  status: 'available' | 'purchased' | 'gifted'
}

export interface IGiftHistory {
  id: string
  from: IUser
  to?: IUser
  gift: IGift
  date: string
  status: 'sent' | 'received'
} 