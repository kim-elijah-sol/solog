import $notifications, { Notification } from '@atoms/global/notifications'
import { css, keyframes, useTheme } from '@emotion/react'
import { scaleForDomain } from '@shared/function'
import { circle } from '@styles/common'
import { opacity, staticColor } from '@styles/palette'
import transition from '@styles/transition'
import { useRecoilValue } from 'recoil'

const maxStackedLength = 3

function minZero(value: number) {
  return value < 0 ? 0 : value
}

function NotificationCenter() {
  const notifications = useRecoilValue($notifications)

  const style = css`
    position: fixed;
    right: 32px;
    bottom: 32px;
  `

  const viewableCards = notifications.filter(({ isExpired }) => !isExpired)

  const viewableCardLength = viewableCards.length

  const priorityDecrease =
    viewableCardLength > maxStackedLength
      ? viewableCardLength - maxStackedLength
      : 0

  return (
    <div css={style}>
      {notifications.map((notification, index) => {
        const priority = viewableCards.findIndex(
          ({ key }) => key === notification.key
        )

        return (
          <Card
            {...notification}
            key={notification.key}
            priority={priority}
            priorityDecrease={priorityDecrease}
            viewableCardLength={viewableCardLength}
          />
        )
      })}
    </div>
  )
}

interface CardProps extends Notification {
  priority: number
  priorityDecrease: number
  viewableCardLength: number
}

function Card({
  content,
  type,
  isExpired,
  priority,
  priorityDecrease,
  viewableCardLength,
}: CardProps) {
  const { color } = useTheme()

  const begin = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.6) translateY(16px);
    }

    100% {
      opacity: 1;
      transform: scale(1) translateX(0px);
    }
  `

  let bottom = minZero(priority - priorityDecrease)

  const stackedCardLength = viewableCardLength - priorityDecrease

  const scale = (bottom + 1) / stackedCardLength

  const containerStyle = css`
    animation: ${begin} ${transition.normal} ease forwards;
    transition: ${transition.normal};
    right: 0;
    position: absolute;
    backdrop-filter: blur(2px);
  `

  const cardBorderColor = opacity({
    color: '#ffffff',
    opacity: 0.18,
  })

  const cardStyle = css`
    color: ${color.text_900};
    transition: ${transition.normal};
    width: 300px;
    text-align: center;
    padding: 16px;
    position: relative;

    background: ${opacity({
      color: color.text_500,
      opacity: 0.25,
    })};
    border-radius: 16px;
    border: 1px solid ${cardBorderColor};
  `

  const expiredStyle = css`
    opacity: 0 !important;
    transform: scale(0.6) translateY(16px) !important;
  `

  const dotStyle = css`
    position: absolute;
    left: 8px;
    top: 8px;
    background-color: ${type === 'error'
      ? staticColor.red_900
      : staticColor.primary_900};
  `

  return (
    <div
      css={containerStyle}
      style={{
        bottom: bottom * 16,
      }}
    >
      <div
        style={{
          opacity: scale,
          transform: `scale(${scaleForDomain([0.7, 1], scale)})`,
        }}
        css={[cardStyle, isExpired ? expiredStyle : undefined]}
      >
        <div className='dot' css={[dotStyle, circle(6)]} />
        {content}
      </div>
    </div>
  )
}

export default NotificationCenter
