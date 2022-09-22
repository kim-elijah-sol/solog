import { selector } from 'recoil'

import $category from '../../atoms/workroom/category'

const $categorys = selector({
  key: '@workroom/categorys',
  get: ({ get }) => {
    const category = get($category)

    return category
      .split(',')
      .map((category) => category.trim())
      .filter((category) => category !== '')
  },
})

export default $categorys
