import { atom } from 'recoil'

const $title = atom({
  key: '@workroom/title',
  default: '',
})

export default $title
