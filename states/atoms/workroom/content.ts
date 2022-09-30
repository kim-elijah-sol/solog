import { atom } from 'recoil'
import { v1 } from 'uuid'

const $content = atom({
  key: `@workroom/content__${v1()}`,
  default: '',
})

export default $content
