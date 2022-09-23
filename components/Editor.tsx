import { css, useTheme } from '@emotion/react'
import transition from '@styles/transition'

function Editor() {
  const { color } = useTheme()

  const style = css`
    width: 100%;
    height: 100%;
    resize: none;
    border: none;

    color: ${color.text_900};
    background-color: transparent;
    transition: ${transition.fast};

    &::placeholder {
      color: ${color.text_300};
    }
  `

  return (
    <textarea
      css={style}
      placeholder='오늘 공유하고 싶은 내용을 입력해주세요.'
    />
  )
}

export default Editor
