import { css, useTheme } from '@emotion/react'

import Flex from './layout/Flex'

import transition from '@styles/transition'
import { opacity, staticColor } from '@styles/palette'
import { ComponentProps, ReactElement } from 'react'

type ItemElement = ReactElement<ComponentProps<typeof Item>>

interface Props {
  children: ItemElement | ItemElement[]
}

function Categorys({ children }: Props) {
  const style = css`
    width: 100%;
    gap: 12px;
    flex-wrap: wrap;

    margin-bottom: 3rem;

    @media screen and (max-width: 680px) {
      margin-bottom: 2rem;
    }
  `

  return <Flex css={style}>{children}</Flex>
}

interface ItemProps {
  children: string
  isDuplicated?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

function Item({ children, isDuplicated, onClick }: ItemProps) {
  const { color } = useTheme()

  const outSideColor = isDuplicated
    ? staticColor.red_900
    : staticColor.primary_900

  const inSideColor = isDuplicated
    ? staticColor.red_600
    : staticColor.primary_600

  const style = css`
    color: white;
    transition: ${transition.fast};
    padding: 0 0.75rem;
    background-color: ${outSideColor};
    font-size: 1rem;
    height: 28px;
    line-height: 28px;
    border-radius: 16px;
    cursor: pointer;
    transform: rotate(0.001deg);
    white-space: nowrap;

    &:hover {
      background-color: ${opacity({
        color: inSideColor,
        opacity: color.type === 'light' ? 0.5 : 0.3,
      })};
      box-shadow: inset 0 0 0 ${1}px
        ${opacity({
          color: outSideColor,
          opacity: 0.7,
        })};
      backdrop-filter: blur(4px);
    }
  `

  return (
    <div css={style} onClick={onClick}>
      {children}
    </div>
  )
}

Categorys.Item = Item

export default Categorys
