import { atom } from 'recoil'

const $content = atom({
  key: '@workroom/content',
  default: '',
})

export default $content
