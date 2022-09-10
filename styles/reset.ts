import { css } from '@emotion/react'
import transition from './transition'

export const reset = css`
  #__next {
    min-height: 100vh;
    width: 100%;
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
    line-height: 1.2;
    font-size: 14px;

    &:focus {
      outline: 0;
    }
  }
`
