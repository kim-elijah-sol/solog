import { atom } from 'recoil'

type Type = 'error' | 'notice'

export interface Notification {
  key: string
  type: Type
  content: React.ReactNode
  isExpired: boolean
  expiredTime: number
}

const $notifications = atom<Notification[]>({
  key: '@global/notifications',
  default: [],
})

export default $notifications
