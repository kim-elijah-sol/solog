import { atom } from 'recoil'

export interface Notification {
  key: string
  content: string
  isExpired: boolean
  expiredTime: number
}

const $notifications = atom<Notification[]>({
  key: '@global/notifications',
  default: [],
})

export default $notifications
