import { css, Interpolation, Theme } from '@emotion/react'
import { ClassAttributes, HTMLAttributes } from 'react'

type ContainerProps = ClassAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement> & {
    css?: Interpolation<Theme>
  }

interface Props extends Omit<ContainerProps, 'children'> {
  zIndex: number
  background?: string
}

function FixedBackground({ zIndex, background, ...props }: Props) {
  return (
    <div
      {...props}
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
