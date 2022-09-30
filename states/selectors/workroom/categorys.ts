import { selector } from 'recoil'
import { v1 } from 'uuid'

import $category from '../../atoms/workroom/category'

const $categorys = selector({
  key: `@workroom/categorys__${v1()}`,
  get: ({ get }) => {
    const category = get($category)

    return category
      .split(',')
      .map((category) => category.trim())
      .filter((category) => category !== '')
  },
})

export default $categorys
