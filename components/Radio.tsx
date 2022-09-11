import {
  hide,
  radioCheckboxLabelStyle,
  radioCheckboxTextStyle,
} from '@styles/common'
import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import { ClassAttributes, InputHTMLAttributes } from 'react'
import { staticColor } from '@styles/palette'
import transition from '@styles/transition'

type RadioProps = ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>
    id: string
    name: string
  }

function Radio({ children, ...radioProps }: Omit<RadioProps, 'type'>) {
  const { color } = useTheme()

  const { id, checked } = radioProps

  const isDisabled = radioProps.disabled || radioProps.readOnly

  const circleColor = radioCheckboxLabelStyle({
    checked,
    isDisabled,
    color,
  })

  return (
    <>
      <label
        htmlFor={id}
        css={[
          radioCheckboxTextStyle({
            checked,
            isDisabled,
            color,
          }),
          css`
            display: flex;
            align-items: center;
            transition: color ${transition.fast};

            ${
              // 마우스 올렸을 때 써클 영역 스타일
              !isDisabled &&
              !checked &&
              `
            &:hover > div {
              border-color: ${staticColor.primary_700};
            }
            `
            }
          `,
        ]}
      >
        <input type='radio' {...radioProps} css={hide} />

        <div
          css={css`
            position: relative;
            width: 18px;
            height: 18px;
            border: 1px solid ${circleColor};
            border-radius: 50%;
            transition: border-color ${transition.fast};
            margin-right: 8px;

            &::before {
              content: '';
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%) scale(${checked ? 1 : 0});
              width: 8px;
              height: 8px;
              background-color: ${circleColor};
              border-radius: 50%;
              transition: all ${transition.fast};
            }
          `}
        />
        {children}
      </label>
    </>
  )
}

export default Radio
