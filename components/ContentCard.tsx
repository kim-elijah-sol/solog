import { css, useTheme } from '@emotion/react'
import { Content } from '@shared/contents'
import { staticColor } from '@styles/palette'
import Link from 'next/link'
import Flex from './layout/Flex'

interface Props extends Content {
  index: number
}

function ContentCard({
  url,
  index,
  coverUrl,
  title,
  description,
  createdAt,
}: Props) {
  const { color } = useTheme()

  return (
    <Link
      href={url}
      css={{
        width: '100%',
        marginTop: index === 0 ? undefined : '6rem',
        '&:hover': css`
          img {
            transform: translateY(-1rem);
          }

          h2 {
            color: ${staticColor.primary_700};
          }
        `,
        '@media (max-width: 680px)': {
          marginTop: index === 0 ? undefined : '4rem',
        },
      }}
    >
      <Flex
        css={{
          alignItems: 'center',
          '@media (max-width: 680px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
          },
        }}
      >
        <img
          src={coverUrl}
          css={{
            width: 180,
            height: 180,
            objectFit: 'cover',
            borderRadius: '2rem',
            marginRight: '2rem',
            transition: 'transform 0.2s',
            '@media (max-width: 680px)': {
              width: '100%',
              marginRight: 0,
              marginBottom: '1.75rem',
            },
            border:
              color.type === 'dark'
                ? `1px solid rgba(255, 255, 255, 0.18)`
                : `1px solid rgba(100, 100, 100, 0.18)`,
          }}
        />

        <div>
          <h2
            css={{
              fontSize: '2.25rem',
              marginBottom: '2rem',
              transition: 'color 0.2s',
              wordBreak: 'keep-all',
              lineHeight: '2.5rem',
              '@media (max-width: 680px)': {
                fontSize: '1.75rem',
                marginBottom: '1.25rem',
              },
            }}
          >
            {title}
          </h2>

          <p
            css={{
              color: color.text_700,
              fontSize: '1.15rem',
              marginBottom: '1.75rem',
              wordBreak: 'keep-all',
              lineHeight: '1.5rem',
              '@media (max-width: 680px)': {
                fontSize: '1rem',
                marginBottom: '1.25rem',
              },
            }}
          >
            {description}
          </p>

          <time
            css={{
              color: color.text_500,
              fontSize: '1rem',
            }}
          >
            {createdAt}
          </time>
        </div>
      </Flex>
    </Link>
  )
}

export default ContentCard
