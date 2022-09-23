import { useRecoilState } from 'recoil'
import { css, useTheme } from '@emotion/react'

import $title from '@atoms/workroom/title'

import transition from '@styles/transition'

function TitleInput() {
  const { color } = useTheme()

  const [title, setTitle] = useRecoilState($title)

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }

  const style = css`
    color: ${color.text_900};
    font-size: 2.75rem;
    font-weight: bold;
    transition: ${transition.fast};

    &::placeholder {
      color: ${color.text_300};
    }
  `

  return (
    <input
      type='text'
      value={title}
      onChange={onChangeTitle}
      css={style}
      placeholder='제목을 입력해주세요.'
    />
  )
}

export default TitleInput
