import Flex from '@components/layout/Flex'
import { PropsWithChildren } from 'react'

function Container({ children }: PropsWithChildren) {
  return (
    <Flex
      as='article'
      column
      css={{
        maxWidth: 648,
        margin: '4rem auto 8rem',
        width: 'calc(100% - 32px)',
        '@media (max-width: 680px)': {
          marginTop: '1.25rem',
          marginBottom: '2rem',
        },
      }}
    >
      {children}
    </Flex>
  )
}

export default Container
