import { atom } from 'recoil'
import { v1 } from 'uuid'

const $title = atom({
  key: `@workroom/title__${v1()}`,
  default: '',
})

export default $title
