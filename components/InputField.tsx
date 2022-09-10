import { Interpolation } from '@emotion/styled'
import { ClassAttributes, InputHTMLAttributes } from 'react'
import { css, Theme, useTheme } from '@emotion/react'
import { opacity } from '@styles/palette'
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
          width: 300px;
          height: 46px;
          padding: 0 16px;
          background-color: ${color.text_50};
          color: ${color.text_900};
          border-radius: 8px;
          transition: all ${transition.fast};

          &:focus {
            background-color: ${opacity({
              color: color.text_100,
              opacity: 0.7,
            })};
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
