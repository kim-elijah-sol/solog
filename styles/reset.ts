import { css } from '@emotion/react'

export const reset = css`
  #__next {
    min-height: 100vh;
    width: 100%;
    transition: background 0.21s;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.2;
  }

  button,
  input,
  ul,
  li {
    all: unset;
  }
`
