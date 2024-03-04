import ArticleNavigator from '@components/ArticleNavigator'
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
import Head from 'next/head'
import Link from 'next/link'

const listStyle = css`
  max-width: 648px;
  margin: 4rem auto 8rem;
  width: calc(100% - 32px);
`

const CoverImage = styled.img`
  height: 300px;
  border-radius: 16px;
  object-fit: cover;
  border: ${(props) =>
    props.theme.color.type === 'dark'
      ? `1px solid rgba(255, 255, 255, 0.18)`
      : `1px solid rgba(100, 100, 100, 0.18)`};
  margin-bottom: 2.5rem;

  @media screen and (max-width: 680px) {
    margin-bottom: 2rem;
    height: 200px;
  }
`

interface Props {
  content: Content
  prevContent: Content | null
  nextContent: Content | null
}

function ArticleDetail({
  content: { title, coverUrl, createdAt, categorys, content, description },
  prevContent,
  nextContent,
}: Props) {
  const seoTitle = `${title} | Solog`

  const ogImage = `https://solog.dev${coverUrl}`

  return (
    <Flex
      as='article'
      column
      css={[
        listStyle,
        {
          '@media (max-width: 680px)': {
            marginTop: '1.25rem',
            marginBottom: '2rem',
          },
        },
      ]}
    >
      <Head>
        <title>{seoTitle}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={seoTitle} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={ogImage} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={seoTitle} />
        <meta name='twitter:description' content={description} />
        <meta property='twitter:image' content={ogImage} />
      </Head>
      <CoverImage src={coverUrl} alt={title} />
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
      <Markdown>{content}</Markdown>

      {(prevContent !== null || nextContent !== null) && (
        <>
          <Spacing size='6rem' />
          <ArticleNavigator>
            {prevContent !== null && (
              <Link href={prevContent.url}>
                <ArticleNavigator.Wrap type='prev'>
                  <ArticleNavigator.Label>이전 아티클</ArticleNavigator.Label>
                  <ArticleNavigator.Title>
                    {prevContent.title}
                  </ArticleNavigator.Title>
                </ArticleNavigator.Wrap>
              </Link>
            )}

            {nextContent !== null && (
              <Link href={nextContent.url}>
                <ArticleNavigator.Wrap type='next'>
                  <ArticleNavigator.Label>다음 아티클</ArticleNavigator.Label>
                  <ArticleNavigator.Title>
                    {nextContent.title}
                  </ArticleNavigator.Title>
                </ArticleNavigator.Wrap>
              </Link>
            )}
          </ArticleNavigator>
        </>
      )}
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title } = context.query

  const matchedContentIndex = contents.findIndex(
    (content) => content.title.replace(/ /g, '-').replace(/\./g, '-') === title
  )

  if (matchedContentIndex === -1)
    return {
      notFound: true,
    }

  const props: Props = {
    content: contents[matchedContentIndex],
    prevContent: contents[matchedContentIndex + 1] ?? null,
    nextContent: contents[matchedContentIndex - 1] ?? null,
  }

  return {
    props,
  }
}

export default ArticleDetail
