import { atom } from 'recoil'
import { v1 } from 'uuid'

const $category = atom({
  key: `@workrooom/category__${v1()}`,
  default: '',
})

export default $category
