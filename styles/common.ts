import { css } from '@emotion/react'
import { ThemeColor } from 'emotion'
import { staticColor } from './palette'
import transition from './transition'

export const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const boxShadowBorder = ({
  width,
  color,
  isImportant,
}: {
  width: number
  color: string
  isImportant?: boolean
}) => css`
  box-shadow: inset 0 0 0 ${width}px ${color}${isImportant ? ' !important' : ''};
`
/**
 * @params thumbColor: 막대 컬러
 */
export const thinScrollBar = (thumbColor: string) => css`
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    transition: background-color ${transition.fast};
    background-color: ${thumbColor};
  }
`

export const hide = css`
  display: none;
`

interface RadioCheckboxProps {
  checked?: boolean
  isDisabled?: boolean
  color: ThemeColor
}

export const radioCheckboxTextStyle = ({
  checked,
  isDisabled,
  color,
}: RadioCheckboxProps) => css`
  color: ${isDisabled
    ? color.text_200
    : checked
    ? color.text_900
    : color.text_500};
  cursor: ${isDisabled ? 'not-allowed' : 'pointer'};

  ${!isDisabled &&
  !checked &&
  `
    &:hover {
      color: ${color.text_700};
    }
  `}
`

export const radioCheckboxLabelStyle = ({
  checked,
  isDisabled,
  color,
}: RadioCheckboxProps) =>
  checked
    ? isDisabled
      ? staticColor.primary_300
      : staticColor.primary_900
    : isDisabled
    ? color.text_200
    : color.text_500
