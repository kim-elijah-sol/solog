import { css } from '@emotion/react'

export const reset = css`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  #__next {
    min-height: 100vh;
    width: 100vw;
  }

  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
`
