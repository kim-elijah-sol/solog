import { css } from '@emotion/react'
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
