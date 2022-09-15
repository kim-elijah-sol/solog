import Link from '@components/Link'
import ThemeToggleButton from '@components/ThemeToggleButton'
import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import { firaCode } from '@styles/common'
import { ClassAttributes, HTMLAttributes } from 'react'
import Flex from './Flex'

type HeaderProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> & {
    css?: Interpolation<Theme>
  }

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 64px;

  padding: 0 32px;
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
    </header>
  )
}

export default Header
