import { css, Global, useTheme } from '@emotion/react'
import { reset } from '@styles/reset'

function GlobalStyle() {
  const { color } = useTheme()

  return (
    <Global
      styles={[
        reset,
        css`
          body {
            background-color: ${color.background};
          }

          * {
            color: ${color.text_900};
          }
        `,
      ]}
    />
  )
}

export default GlobalStyle
