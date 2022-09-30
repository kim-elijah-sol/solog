import $content from '@atoms/workroom/content'
import { css, Interpolation, Theme, useTheme } from '@emotion/react'
import { pointer, square } from '@styles/common'
import transition from '@styles/transition'
import { useRecoilState } from 'recoil'
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
import { ClassAttributes, ButtonHTMLAttributes, useRef, useEffect } from 'react'

interface Props {
  textarea: React.RefObject<HTMLTextAreaElement>
}

type SplitingContent = {
  content: string
  start: number
  end: number
}

const size = '36px'

function Toolbar({ textarea }: Props) {
  const [content, setContent] = useRecoilState($content)

  const afterSelectionRange = useRef<[number, number]>([-1, -1])

  function onClickHeading(heading: number) {
    const headingSymbol = Array(heading).fill('#').join('') + ' '

    const { selectionStart } = getSelection()

    const contents = getSplitingContent()

    const _afterSelectionRange = contents.reduce(
      (acc: [number, number], content: SplitingContent) => {
        if (selectionStart >= content.start && selectionStart <= content.end) {
          const alreadyHeading = content.content.includes(headingSymbol)

          const advantage = alreadyHeading ? -1 : 1

          const selectionEnd = content.end + (heading + 1) * advantage

          const next: [number, number] = [selectionEnd, selectionEnd]
          return next
        }

        return acc
      },
      [-1, -1]
    )

    afterSelectionRange.current = _afterSelectionRange

    const content = contents
      .map((content) =>
        selectionStart >= content.start && selectionStart <= content.end
          ? content.content.includes(headingSymbol)
            ? content.content.replace(headingSymbol, '')
            : `${headingSymbol}${content.content}`
          : content.content
      )
      .join('\n')

    setContent(content)
  }

  function onClickAccent(tag: string) {
    const { selectionStart, selectionEnd } = getSelection()

    const contents = getSplitingContent()

    const tagSize = tag.length

    if (selectionStart === selectionEnd) {
      const _afterSelectionRange = contents.reduce(
        (acc: [number, number], content: SplitingContent) => {
          if (
            selectionStart >= content.start &&
            selectionStart <= content.end
          ) {
            const alreadyAccent = content.content.includes(tag)

            const nextIndex = tagSize * (alreadyAccent ? -1 : 1)

            const next: [number, number] = [
              Math.max(content.start + nextIndex, 0),
              content.end + nextIndex,
            ]

            return next
          }

          return acc
        },
        [-1, -1]
      )

      afterSelectionRange.current = _afterSelectionRange

      const content = contents
        .map((content) =>
          selectionStart >= content.start && selectionStart <= content.end
            ? content.content.includes(tag)
              ? content.content.replaceAll(tag, '')
              : `${tag}${content.content}${tag}`
            : content.content
        )
        .join('\n')

      setContent(content)
    } else {
      afterSelectionRange.current = [
        selectionStart + tagSize,
        selectionEnd + tagSize,
      ]

      const head = content.substring(0, selectionStart)
      const middle = content.substring(selectionStart, selectionEnd)
      const tail = content.substring(selectionEnd)

      setContent(`${head}${tag}${middle}${tag}${tail}`)
    }
  }

  function onClickNewLine() {
    const newLine = '<br/>'

    const { selectionStart } = getSelection()

    const head = content.substring(0, selectionStart)
    const tail = content.substring(selectionStart)

    const nextContent = `${head}\n${newLine}\n${tail}`

    const selectionRange = selectionStart + 7

    afterSelectionRange.current = [selectionRange, selectionRange]

    setContent(nextContent)
  }

  /**
   * 현재 Editor 영역 선택된 위치 반환
   */
  function getSelection() {
    if (textarea.current) {
      const { selectionEnd, selectionStart } = textarea.current

      return { selectionStart, selectionEnd }
    }

    return { selectionStart: 0, selectionEnd: 0 }
  }

  function setSelection() {
    const [start, end] = afterSelectionRange.current

    textarea.current?.setSelectionRange(start, end !== -1 ? end : start)

    textarea.current?.focus()

    afterSelectionRange.current = [-1, -1]
  }

  /**
   * 현재 입력된 컨텐츠 \n 단위로 자른 Object 리턴
   */
  function getSplitingContent() {
    return content
      .split('\n')
      .reduce((acc: SplitingContent[], content: string, index: number) => {
        const last = acc[acc.length - 1]

        const start = index === 0 ? 0 : last.end + 1

        return acc.concat({
          content,
          start: start,
          end: start + content.length,
        })
      }, [])
  }

  useEffect(() => {
    if (afterSelectionRange.current[0] !== -1) {
      setSelection()
    }
  }, [content])

  const style = css`
    width: 100%;
    height: ${size};
    gap: 4px;
    align-items: center;
  `

  return (
    <Flex css={style}>
      <Button onClick={() => onClickHeading(2)}>
        <H2 />
      </Button>
      <Button onClick={() => onClickHeading(3)}>
        <H3 />
      </Button>
      <Button onClick={() => onClickHeading(4)}>
        <H4 />
      </Button>
      <Bar />
      <Button>
        <Bold onClick={() => onClickAccent('**')} />
      </Button>
      <Button>
        <Italic onClick={() => onClickAccent('*')} />
      </Button>
      <Button>
        <NewLine onClick={onClickNewLine} />
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

type ButtonProps = ClassAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    css?: Interpolation<Theme>
  }

function Button({ children, ...rest }: ButtonProps) {
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

  return (
    <button {...rest} css={[square(size), pointer, style]}>
      {children}
    </button>
  )
}

function Bar() {
  const { color } = useTheme()

  const style = css`
    width: 2px;
    height: 14px;
    margin: 0 12px;
    background-color: ${color.text_500};
  `

  return <div css={style} />
}

export default Toolbar
