import { css, Global, useTheme } from '@emotion/react'
import { reset } from '@styles/reset'

function GlobalStyle() {
  const { color } = useTheme()

  return (
    <Global
      styles={[
        reset,
        css`
          #__next {
            background-color: ${color.background};
          }
        `,
      ]}
    />
  )
}

export default GlobalStyle
