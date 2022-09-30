import { atom } from 'recoil'
import { v1 } from 'uuid'

type Type = 'error' | 'notice'

export interface Notification {
  key: string
  type: Type
  content: React.ReactNode
  isExpired: boolean
  expiredTime: number
}

const $notifications = atom<Notification[]>({
  key: `@global/notifications__${v1()}`,
  default: [],
})

export default $notifications
