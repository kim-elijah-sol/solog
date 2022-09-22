import { useTheme, css } from '@emotion/react'
import { useRecoilState } from 'recoil'

import $category from '@atoms/workroom/category'

import transition from '@styles/transition'

function CategoryInput() {
  const { color } = useTheme()

  const [category, setCategory] = useRecoilState($category)

  const style = css`
    color: ${color.text_900};
    font-size: 1.25rem;
    transition: ${transition.fast};

    &::placeholder {
      color: ${color.text_200};
    }
  `

  function onChangeCategory(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value)
  }

  return (
    <input
      type='text'
      value={category}
      onChange={onChangeCategory}
      css={style}
      placeholder={`카테고리를 입력해주세요. (',' 자로 구분)`}
    />
  )
}

export default CategoryInput
