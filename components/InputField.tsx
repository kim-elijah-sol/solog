import { Interpolation } from '@emotion/styled'
import { ClassAttributes, InputHTMLAttributes } from 'react'
import { css, Theme, useTheme } from '@emotion/react'

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
          max-width: 268px;
          width: 268px;
          height: 46px;
          padding: 0 16px;
          background-color: ${color.text_50};
          color: ${color.text_900};
          border-radius: 8px;

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
