import { css, useTheme } from '@emotion/react'
import transition from '@styles/transition'

interface Props {
  children: string
}

function Title({ children }: Props) {
  const { color } = useTheme()

  const style = css`
    color: ${color.text_900};
    font-size: 2.5rem;
    width: 100%;
    transition: ${transition.fast};
    word-break: keep-all;

    @media screen and (max-width: 680px) {
      font-size: 2rem;
    }
  `

  return <h1 css={style}>{children}</h1>
}

export default Title
