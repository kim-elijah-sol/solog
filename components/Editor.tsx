import $content from '@atoms/workroom/content'
import { css, useTheme } from '@emotion/react'
import transition from '@styles/transition'
import React, { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import Spacing from './layout/Spacing'
import Toolbar from './Toolbar'

type Command = '' | 'Tab'

function Editor() {
  const textarea = useRef<HTMLTextAreaElement>(null)

  const command = useRef<Command>('')

  const tabAfterRange = useRef<number>(0)

  const { color } = useTheme()

  const [content, setContent] = useRecoilState($content)

  const style = css`
    width: 100%;
    height: calc(calc(100% - 1rem) - 32px);
    resize: none;
    border: none;
    letter-spacing: 0.075rem;

    color: ${color.text_900};
    background-color: transparent;
    transition: ${transition.fast};
    line-height: 2rem;

    &::placeholder {
      color: ${color.text_300};
    }
  `

  function handleChangeContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
  }

  function onTab(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    e.preventDefault()

    const { value, selectionStart } = e.currentTarget

    const start = value.substring(0, selectionStart)
    const end = value.substring(selectionStart)

    command.current = 'Tab'
    tabAfterRange.current = selectionStart + 2

    setContent(`${start}  ${end}`)
  }

  onTab.after = function () {
    const range = tabAfterRange.current

    textarea.current?.setSelectionRange(range, range)

    command.current = ''
    tabAfterRange.current = 0
  }

  function onKeydown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') onTab(e)
  }

  useEffect(() => {
    if (command.current === 'Tab') onTab.after()
  }, [content])

  return (
    <>
      <Toolbar textarea={textarea} />
      <Spacing size='1rem' />
      <textarea
        ref={textarea}
        css={style}
        value={content}
        onChange={handleChangeContent}
        onKeyDown={onKeydown}
        placeholder='오늘 공유하고 싶은 내용을 입력해주세요.'
      />
    </>
  )
}

export default Editor
