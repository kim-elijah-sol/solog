import $content from '@atoms/workroom/content'
import { css, useTheme } from '@emotion/react'
import transition from '@styles/transition'
import React from 'react'
import { useRecoilState } from 'recoil'

function Editor() {
  const { color } = useTheme()

  const [content, setContent] = useRecoilState($content)

  const style = css`
    width: 100%;
    height: 100%;
    resize: none;
    border: none;

    color: ${color.text_900};
    background-color: transparent;
    transition: ${transition.fast};
    line-height: 2rem;

    &::placeholder {
      color: ${color.text_300};
    }
  `

  function onChangeContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
  }

  return (
    <textarea
      css={style}
      value={content}
      onChange={onChangeContent}
      placeholder='오늘 공유하고 싶은 내용을 입력해주세요.'
    />
  )
}

export default Editor
