import { css } from '@emotion/react'
import { DefaultProps } from 'next-env'

interface Props extends DefaultProps<HTMLDivElement> {
  children?: React.ReactNode
  column?: boolean
  as?: 'article' | 'main'
}

function Flex(props: Props) {
  const { children, column, as, ...containerProps } = props

  const Container = as ?? 'div'

  const style = css`
    display: flex;
    flex-direction: ${column ? 'column' : 'row'};
  `

  return (
    <Container {...containerProps} css={[style]}>
      {children}
    </Container>
  )
}

export default Flex
