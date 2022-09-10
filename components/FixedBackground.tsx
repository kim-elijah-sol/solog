import { css } from '@emotion/react'

interface Props {
  zIndex: number
  background?: string
}

function FixedBackground({ zIndex, background }: Props) {
  return (
    <div
      css={css`
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: ${zIndex};
        background: ${background ?? 'transparent'};
        cursor: default;
      `}
    />
  )
}

export default FixedBackground
