import { css } from '@emotion/react'
import transition from './transition'

export const reset = css`
  #__next {
    transition: background ${transition.fast};
  }

  button,
  input {
    border: 0;
    appearance: none;
    background-color: transparent;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.2;
    text-decoration: none;

    &:focus {
      outline: 0;
    }

    &:not(h1, h2, h3, h4, h5, h6) {
      font-size: 14px;
    }

    -webkit-tap-highlight-color: transparent;
  }
`
