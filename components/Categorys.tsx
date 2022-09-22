import { css, useTheme } from '@emotion/react'
import { opacity, staticColor } from '@styles/palette'
import transition from '@styles/transition'
import Flex from './layout/Flex'

export type OnClickParam = {
  category: string
  index: number
}

export type CategoryOnClickEvent = (param: OnClickParam) => void

interface Props {
  categorys: string[]
  onClick?: CategoryOnClickEvent
}

function Categorys({ categorys, onClick }: Props) {
  const style = css`
    width: calc(100% - 32px);
    max-width: 648px;
    margin: 0 auto;
    gap: 12px;
    flex-wrap: wrap;
  `

  function innerOnClick(param: OnClickParam) {
    if (onClick) onClick(param)
  }

  return (
    <Flex css={style}>
      {categorys.map((category, index) => (
        <Category
          key={index}
          onClick={() =>
            innerOnClick({
              category,
              index,
            })
          }
        >
          {category}
        </Category>
      ))}
    </Flex>
  )
}

interface CategoryProps {
  children: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

function Category({ children, onClick }: CategoryProps) {
  const { color } = useTheme()

  const style = css`
    color: ${color.text_900};
    transition: ${transition.fast};
    padding: 0 12px;
    background-color: ${staticColor.primary_700};
    font-size: 1.25rem;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    color: ${color.text_900};
    cursor: pointer;
    transform: rotate(0.001deg);
    white-space: nowrap;

    &:hover {
      background-color: ${opacity({
        color: staticColor.primary_600,
        opacity: 0.4,
      })};
      backdrop-filter: blur(4px);
      box-shadow: inset 0 0 0 ${1}px
        ${opacity({
          color: staticColor.primary_700,
          opacity: 0.7,
        })};
    }
  `

  return (
    <div css={style} onClick={onClick}>
      {children}
    </div>
  )
}

export default Categorys
