import ContentCard from '@components/ContentCard'
import Flex from '@components/layout/Flex'
import { css } from '@emotion/react'
import contents from '@shared/contents'

const listStyle = css`
  align-items: center;
  max-width: 764px;
  margin: 4rem auto 8rem;
  width: calc(100% - 32px);
`

function Home() {
  return (
    <Flex
      as='article'
      column
      css={[
        listStyle,
        {
          '@media (max-width: 680px)': {
            marginTop: '1.5rem',
            marginBottom: '2rem',
          },
        },
      ]}
    >
      {contents.map((content, index) => (
        <ContentCard {...content} key={index} index={index} />
      ))}
    </Flex>
  )
}

export default Home
