import { ClassAttributes, InputHTMLAttributes } from 'react'
import { css, Theme, useTheme } from '@emotion/react'
import { Interpolation } from '@emotion/styled'
import { boxShadowBorder } from '@styles/common'
import { staticColor } from '@styles/palette'
import transition from '@styles/transition'

type InputProps = ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>
  }

interface Props extends InputProps {}

const palette = {
  width: 300,
  height: 46,
  radius: 8,
  horizontalPadding: 16,
  focusOpacity: 0.7,
}

function InputField(props: Props) {
  const { color } = useTheme()

  const { children, ...inputProps } = props

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <input
        {...inputProps}
        css={css`
          width: ${palette.width}px;
          height: ${palette.height}px;
          padding: 0 ${palette.horizontalPadding}px;
          color: ${color.text_900};
          border-radius: ${palette.radius}px;
          transition: all ${transition.fast} ease;
          ${boxShadowBorder({ width: 1, color: color.text_100 })}
          box-shadow: inset 0 0 0 1px ${color.text_100};

          &:hover {
            ${boxShadowBorder({ width: 2, color: staticColor.primary_400 })}
          }

          &:focus {
            ${boxShadowBorder({ width: 2, color: staticColor.primary_900 })}
          }

          &::placeholder {
            color: ${color.text_300};
          }
        `}
      />
      {children}
    </div>
  )
}

InputField.palette = palette

export default InputField
