import { ClassAttributes, InputHTMLAttributes } from 'react'
import { css, Theme, useTheme } from '@emotion/react'
import { Interpolation } from '@emotion/styled'
import { boxShadowBorder, inputSizes } from '@styles/common'
import { staticColor } from '@styles/palette'
import transition from '@styles/transition'

type InputProps = ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>
  }

interface Props extends InputProps {}

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
          width: ${inputSizes.width}px;
          height: ${inputSizes.height}px;
          padding: 0 ${inputSizes.horizontalPadding}px;
          color: ${color.text_900};
          border-radius: ${inputSizes.radius}px;
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

export default InputField
