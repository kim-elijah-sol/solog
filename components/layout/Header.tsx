import ThemeToggleButton from '@components/ThemeToggleButton'
import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import { firaCode } from '@styles/common'
import Link from 'next/link'
import { ClassAttributes, HTMLAttributes } from 'react'
import Flex from './Flex'

type HeaderProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> & {
    css?: Interpolation<Theme>
  }

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  padding: 0 16px;
`

const rightSlotStyle = css`
  height: 100%;
  align-items: center;
  gap: 16px;
`

function Header(props: Omit<HeaderProps, 'children'>) {
  const { color } = useTheme()

  return (
    <header {...props} css={headerStyle}>
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1024,
          width: '100%',
        }}
      >
        <Link
          href='/'
          css={[
            firaCode(500),
            css`
              text-decoration: unset;
              color: ${color.text_900};
              font-size: 20px;
            `,
          ]}
        >
          Solog
        </Link>
        <Flex css={rightSlotStyle}>
          <ThemeToggleButton />
        </Flex>
      </Flex>
    </header>
  )
}

export default Header
