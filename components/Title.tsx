import { css, useTheme } from '@emotion/react'
import transition from '@styles/transition'

interface Props {
  children: string
}

function Title({ children }: Props) {
  const { color } = useTheme()

  const style = css`
    color: ${color.text_900};
    font-size: 2.75rem;
    width: calc(100% - 32px);
    max-width: 648px;
    margin: 0 auto;
    transition: ${transition.fast};
  `

  return <h1 css={style}>{children}</h1>
}

export default Title
