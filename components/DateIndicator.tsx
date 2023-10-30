import { css, useTheme } from '@emotion/react'
import transition from '@styles/transition'
import Calendar from '@icons/calendar.svg'
import Flex from './layout/Flex'

interface Props {
  children: string
}

function DateIndicator({ children }: Props) {
  const { color } = useTheme()

  const style = css`
    width: 100%;
    align-items: center;
    gap: 8px;

    p {
      color: ${color.text_900};
      transition: ${transition.fast};
    }

    svg {
      transition: ${transition.fast};
      fill: ${color.text_900};
      width: 16px;
      height: 16px;
    }
  `

  return (
    <Flex css={style}>
      <Calendar />
      <p>{children}</p>
    </Flex>
  )
}

export default DateIndicator
