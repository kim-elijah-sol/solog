import { getDuplicates } from '@shared/function'
import { selector } from 'recoil'
import $categorys from './categorys'

const $duplicateCategorys = selector({
  key: '@workroom/duplicateCategorys',
  get: ({ get }) => {
    const categorys = get($categorys)

    return getDuplicates(categorys)
  },
})

export default $duplicateCategorys
