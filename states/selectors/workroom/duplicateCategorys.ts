import { getDuplicates } from '@shared/function'
import { selector } from 'recoil'
import { v1 } from 'uuid'
import $categorys from './categorys'

const $duplicateCategorys = selector({
  key: `@workroom/duplicateCategorys__${v1()}`,
  get: ({ get }) => {
    const categorys = get($categorys)

    return getDuplicates(categorys)
  },
})

export default $duplicateCategorys
