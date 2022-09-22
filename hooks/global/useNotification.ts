import { useRecoilState } from 'recoil'
import { NOTIFICATION_AGE } from '@shared/constant'
import $notification, { Notification } from '@atoms/global/notifications'

function useNotification() {
  const schedules: { [key: string]: NodeJS.Timeout } = {}

  const [notifications, setNotifications] = useRecoilState($notification)

  function notice(param: Omit<Notification, 'isExpired' | 'expiredTime'>) {
    if (notifications.some((notification) => notification.key === param.key))
      return

    setNotifications((notifications) =>
      notifications.concat({
        ...param,
        isExpired: false,
        expiredTime: new Date().valueOf(),
      })
    )

    const schedule = setTimeout(() => {
      hide(param.key)
    }, NOTIFICATION_AGE)

    schedules[param.key] = schedule
  }

  function update(key: string) {
    setNotifications((notifications) =>
      notifications.map((notification) => {
        const isUpdate = notification.key === key

        if (!isUpdate) return notification

        return {
          ...notification,
          expiredTime: notification.expiredTime + NOTIFICATION_AGE,
        }
      })
    )

    const prevSchedule = schedules[key]

    if (prevSchedule) {
      clearInterval(prevSchedule)

      delete schedules[key]
    }

    const schedule = setTimeout(() => {
      hide(key)
    }, NOTIFICATION_AGE)

    schedules[key] = schedule
  }

  function hide(key: string) {
    const currentTime = new Date().valueOf()

    setNotifications((notifications) =>
      notifications.map((notification) => {
        let isHide =
          notification.key === key && notification.expiredTime < currentTime

        if (!isHide) return notification

        return {
          ...notification,
          isExpired: true,
        }
      })
    )

    delete schedules[key]

    setTimeout(() => {
      clear(key)
    }, 300)
  }

  function clear(key: string) {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.key !== key)
    )
  }

  return {
    notice,
    update,
  }
}

export default useNotification
