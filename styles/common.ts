import { css } from '@emotion/react'
import { ThemeColor } from 'emotion'
import { staticColor } from './palette'
import transition from './transition'

/**
 * ... 처리 스타일
 */
export const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

/**
 * box-shadow로 border 스타일 구현
 * @param width : 두께
 * @param color : 색상
 * @param isImportant : !important 여부
 */
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

/**
 * display: none 스타일
 */
export const hide = css`
  display: none;
`

interface RadioCheckboxProps {
  checked?: boolean
  isDisabled?: boolean
  color: ThemeColor
}

/**
 * 라디오 혹은 체크박스의 Label Text 스타일
 * @param checked : 체크 야부
 * @param isDisabled : disabled 여부
 * @param color : 현재 테마의 palette
 */
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

/**
 * 라디오 혹은 체크박스의 Icon Color
 * @param checked : 체크 야부
 * @param isDisabled : disabled 여부
 * @param color : 현재 테마의 palette
 */
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

export const inputSizes = {
  width: 300,
  height: 46,
  radius: 8,
  horizontalPadding: 16,
  focusOpacity: 0.7,
}

type FiraCodeFontWeight = 300 | 400 | 500 | 600 | 700

/**
 * Fira Code 폰트 스타일
 * @param weight : 폰트 굵기
 */
export const firaCode = (weight: FiraCodeFontWeight = 400) => css`
  font-family: 'Fira Code', monospace;
  font-weight: ${weight};
`

export const getSquareString = (size: number | string) => {
  const suffix = typeof size === 'number' ? 'px' : ''
  const value = `${size}${suffix}`

  return `
    width: ${value};
    height: ${value};
  `
}

/**
 * 정사각형 스타일 반환
 */
export const square = (size: number | string) => css`
  ${getSquareString(size)}
`

/**
 * 원형 스타일 반환
 */
export const circle = (size: number | string) => css`
  ${getSquareString(size)}
  border-radius: 50%;
`

export const pointer = css`
  cursor: pointer;
`

export const eResize = css`
  cursor: e-resize;
`

export const relative = css`
  position: relative;
`
