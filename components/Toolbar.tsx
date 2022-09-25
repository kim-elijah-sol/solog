import $content from '@atoms/workroom/content'
import { css, useTheme } from '@emotion/react'
import { pointer, square } from '@styles/common'
import transition from '@styles/transition'
import { useSetRecoilState } from 'recoil'
import Flex from './layout/Flex'

import H2 from '@icons/h2.svg'
import H3 from '@icons/h3.svg'
import H4 from '@icons/h4.svg'
import Bold from '@icons/bold.svg'
import Italic from '@icons/italic.svg'
import Quotes from '@icons/quotes.svg'
import Link from '@icons/link.svg'
import Img from '@icons/img.svg'
import Code from '@icons/code.svg'
import NewLine from '@icons/new-line.svg'

interface Props {
  textarea: React.RefObject<HTMLTextAreaElement>
}

const size = '36px'

function Toolbar({ textarea }: Props) {
  const setContent = useSetRecoilState($content)

  const style = css`
    width: 100%;
    height: ${size};
    gap: 4px;
    align-items: center;
  `

  return (
    <Flex css={style}>
      <Button>
        <H2 />
      </Button>
      <Button>
        <H3 />
      </Button>
      <Button>
        <H4 />
      </Button>
      <Bar />
      <Button>
        <Bold />
      </Button>
      <Button>
        <Italic />
      </Button>
      <Button>
        <NewLine />
      </Button>
      <Bar />
      <Button>
        <Quotes />
      </Button>
      <Button>
        <Link />
      </Button>
      <Button>
        <Img />
      </Button>
      <Button>
        <Code />
      </Button>
    </Flex>
  )
}

interface ButtonProps {
  children: React.ReactNode
}

function Button({ children }: ButtonProps) {
  const { color } = useTheme()

  const style = css`
    border-radius: 8px;
    text-align: center;
    line-height: 100%;
    transition: ${transition.fast};

    &:hover {
      background-color: ${color.text_300};
    }

    &:active {
      background-color: ${color.text_500};
    }

    > svg {
      fill: ${color.text_900};
      transition: ${transition.fast};
    }
  `

  return <button css={[square(size), pointer, style]}>{children}</button>
}

function Bar() {
  const { color } = useTheme()

  const style = css`
    width: 2px;
    height: 14px;
    margin: 0 4px;
    background-color: ${color.text_500};
  `

  return <div css={style} />
}

export default Toolbar
