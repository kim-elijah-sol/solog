import $theme from '@atoms/global/theme'
import { css, useTheme } from '@emotion/react'
import { circle, pointer, square } from '@styles/common'
import transition from '@styles/transition'
import { useSetRecoilState } from 'recoil'

const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

function ThemeToggleButton() {
  const { color } = useTheme()

  const setTheme = useSetRecoilState($theme)

  function onClickThemeToggle() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
  }

  const eclipsePosition = color.type === 'dark' ? 5 : -5

  return (
    <button
      css={[buttonStyle, pointer, square(36)]}
      onClick={onClickThemeToggle}
    >
      <div
        css={[
          circle(color.type === 'dark' ? 24 : 12),
          css`
            background-color: ${color.text_900};
            transition: ${transition.fast};
          `,
        ]}
      >
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
              transition: all ${transition.slow},
                background-color ${transition.fast};
            `,
          ]}
        />
      </div>

      {Array(4)
        .fill(0)
        .map((_, index) => {
          return <Flare rotate={index * 45} key={index} />
        })}
    </button>
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
