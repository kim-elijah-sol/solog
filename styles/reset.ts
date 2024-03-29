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
    text-decoration: none;

    &:focus {
      outline: 0;
    }

    -webkit-tap-highlight-color: transparent;
  }
`
