import Categorys from '@components/Categorys'
import DateIndicator from '@components/DateIndicator'
import Flex from '@components/layout/Flex'
import Spacing from '@components/layout/Spacing'
import Markdown from '@components/Markdown'
import Title from '@components/Title'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import contents, { Content } from '@shared/contents'
import { format } from 'date-fns'
import { GetServerSideProps } from 'next'

const listStyle = css`
  max-width: 648px;
  margin: 4rem auto 8rem;
  width: calc(100% - 32px);
`

const CoverImage = styled.img`
  height: 300px;
  border-radius: 16px;
  object-fit: cover;
`

interface Props {
  content: Content
}

function ArtistDetail({
  content: { title, coverUrl, createdAt, categorys, content },
}: Props) {
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
      <CoverImage src={coverUrl} alt={title} />
      <Spacing size='2.5rem' />
      <Title>{title}</Title>
      <Spacing size='2rem' />
      <DateIndicator>
        {format(new Date(createdAt), 'yyyy년 MM월 dd일')}
      </DateIndicator>
      <Spacing size='1.5rem' />
      <Categorys>
        {categorys.map((category, index) => (
          <Categorys.Item key={index}>{category}</Categorys.Item>
        ))}
      </Categorys>
      <Spacing size='2rem' />
      <Markdown>{content}</Markdown>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title } = context.query

  const matchedContent = contents.find(
    (content) => content.title.replace(/ /g, '-') === title
  )

  if (!matchedContent)
    return {
      notFound: true,
    }

  return {
    props: {
      content: matchedContent,
    },
  }
}

export default ArtistDetail
