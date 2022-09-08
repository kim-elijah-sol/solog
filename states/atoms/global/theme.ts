import { atom } from 'recoil'

export type ThemeType = 'light' | 'dark'

const $theme = atom<ThemeType>({
  key: '@window/theme',
  default: 'light',
})

export default $theme
