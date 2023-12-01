import { css, Interpolation, Theme } from '@emotion/react'
import { ClassAttributes, forwardRef, HTMLAttributes } from 'react'

type ContainerProps = ClassAttributes<HTMLDivElement> &
  HTMLAttributes<HTMLDivElement> & {
    css?: Interpolation<Theme>
  }

interface Props extends ContainerProps {
  children?: React.ReactNode
  column?: boolean
  as?: 'article' | 'main'
}

function Flex(props: Props, $ref: React.Ref<HTMLDivElement>) {
  const { children, column, as, ...containerProps } = props

  const Container = as ?? 'div'

  const style = css`
    display: flex;
    flex-direction: ${column ? 'column' : 'row'};
  `

  return (
    <Container ref={$ref} {...containerProps} css={[style]}>
      {children}
    </Container>
  )
}

export default forwardRef(Flex)
