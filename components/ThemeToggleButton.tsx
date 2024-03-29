import $theme from '@atoms/global/theme'
import { css, useTheme } from '@emotion/react'
import { circle, pointer, square } from '@styles/common'
import transition from '@styles/transition'
import { ComponentProps, ReactElement } from 'react'
import { useSetRecoilState } from 'recoil'

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

function ThemeToggleButton() {
  const {
    color: { type },
  } = useTheme()

  const setTheme = useSetRecoilState($theme)

  function handleClickThemeToggle() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      css={[buttonStyle, pointer, square(36)]}
      onClick={handleClickThemeToggle}
    >
      <Circle>{type === 'dark' ? <Eclipse /> : <></>}</Circle>

      {Array(type === 'light' ? 4 : 0)
        .fill(0)
        .map((_, index) => {
          return <Flare rotate={index * 45} key={index} />
        })}
    </button>
  )
}

interface CircleProps {
  children: ReactElement<ComponentProps<typeof Eclipse>>
}

function Circle({ children }: CircleProps) {
  const { color } = useTheme()

  return (
    <div
      css={[
        circle(color.type === 'dark' ? 24 : 12),
        css`
          background-color: ${color.text_900};
        `,
      ]}
    >
      {children}
    </div>
  )
}

function Eclipse() {
  const { color } = useTheme()

  const eclipsePosition = color.type === 'dark' ? 5 : -5

  return (
    <div
      css={[
        circle(16),
        css`
          position: absolute;
          background-color: ${color.background};
          position: absolute;
          right: ${eclipsePosition}px;
          top: ${eclipsePosition}px;
          transform: rotate(0.001deg);
        `,
      ]}
    />
  )
}

interface FlareProps {
  rotate: number
}

const flareStartPoint = 15

const flareEndPoint = 100 - flareStartPoint

function Flare({ rotate }: FlareProps) {
  const { color } = useTheme()

  const additionalRotate = color.type === 'light' ? 0 : 90

  return (
    <div
      css={css`
        width: ${color.type === 'light' ? 24 : 0}px;
        height: 2px;
        position: absolute;
        left: 50%;
        top: 50%;
        transition: color ${transition.fast}, transform ${transition.slow},
          width ${transition.slow};
        transform: translate(-50%, -50%) rotate(${rotate + additionalRotate}deg);
        background: linear-gradient(
          90deg,
          ${color.text_900} ${flareStartPoint}%,
          ${color.text_900} ${flareStartPoint}%,
          transparent ${flareStartPoint}%,
          transparent ${flareEndPoint}%,
          transparent ${flareEndPoint}%,
          ${color.text_900} ${flareEndPoint}%,
          ${color.text_900} 100%
        );
      `}
    />
  )
}

export default ThemeToggleButton
